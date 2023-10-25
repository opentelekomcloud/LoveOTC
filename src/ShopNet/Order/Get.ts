import { ICartItem } from "~/Components/ShopCart";
import { IOrderExtension, IOrderItem } from "~/Pages/History";
import { IOrderDetail } from "~/Pages/History/Detail";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class OrderGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async List(): Promise<IOrderItem[]> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const res = await this.Hub.invoke<Omit<IOrderItem & { OrderId: number }, "Id">[]>("OrderGetList");

    return res.map(x => {
      const { OrderId, ...rest } = x;
      return {
        Id: OrderId,
        ...rest
      };
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Detail(id: number): Promise<IOrderDetail> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const { ShopCart, Comments } = await this.Hub.invoke<
      Omit<IOrderDetail, "ShopCart"> & {
        ShopCart: Omit<ICartItem, "Id">[];
      }
    >("OrderGetDetail", id);

    return {
      ShopCart: ShopCart.map((x, i) => {
        return {
          Id: i,
          ...x
        };
      }),
      Comments
    };
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Extension(orderId: number): Promise<IOrderExtension> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const res = await this.Hub.invoke<IOrderExtension>("OrderGetExtension", orderId);
    return res;
  }
}
