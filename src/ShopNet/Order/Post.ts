import { ICartItem } from "~/Components/ShopCart";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class OrderPost extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async New(cart: ICartItem[], cmt?: string): Promise<number> {
    this.EnsureLogin();

    const req = cart.map(x => {
      const { Id, ...rest } = x;
      return {
        OrderId: Id,
        ...rest
      };
    });

    await this.EnsureConnected();
    const res = await this.Hub.invoke<number>("OrderPostNew", req, cmt);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Append(orderId: number, cmt: string): Promise<true> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const res = await this.Hub.invoke<true>("OrderPostNew", orderId, cmt);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Cancel(orderId: number, reason: string): Promise<true> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const res = await this.Hub.invoke<true>("OrderPostCancel", orderId, reason);
    return res;
  }
}
