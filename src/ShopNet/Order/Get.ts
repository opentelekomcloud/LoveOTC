import dayjs from "dayjs";
import { ICartItem } from "~/Components/ShopCart";
import { IOrderExtension, IOrderItem } from "~/Pages/History";
import { IOrderDetail } from "~/Pages/History/Detail";
import { ProductEntity } from "../Product/Entity";
import { ShopNet } from "../ShopNet";
import { OrderEntity } from "./Entity";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class OrderGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async List(): Promise<IOrderItem[]> {
    this.EnsureLogin();

    const list = await this.WithTimeCache<typeof OrderGet,
      {
        OrderId: number;
        Products: number[];
        Quantity: number;
      }[]
    >("", "OrderGetList", dayjs().add(1, "m"));

    const items: IOrderItem[] = [];

    for (const meta of list) {
      const order = await OrderEntity.Order(meta.OrderId);

      if (!order) {
        console.error(`OrderGetList Mismatch: Order ${meta.OrderId} not found`);
        continue;
      }

      const prodNames: string[] = [];

      for (const prodId of meta.Products) {
        const prod = await ProductEntity.Product(prodId);

        if (!prod) {
          console.error(`OrderGetList Mismatch: Product ${prodId} not found`);
          continue;
        }

        prodNames.push(prod.Name);
      }

      items.push({
        Id: meta.OrderId,
        Items: prodNames,
        Quantity: meta.Quantity,
        Status: order.Status,
        TrackNumber: order.TrackingNumber,
        OrderDate: order.CreateAt
      });
    }

    return items;
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
