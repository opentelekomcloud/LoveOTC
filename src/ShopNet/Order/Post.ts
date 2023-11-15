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

    const res = await this.Invoke<number>("OrderPostNew", req, cmt);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Append(orderId: number, cmt: string): Promise<true> {
    this.EnsureLogin();
    const res = await this.Invoke<true>("OrderPostNew", orderId, cmt);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Cancel(orderId: number, reason: string): Promise<true> {
    this.EnsureLogin();
    const res = await this.Invoke<true>("OrderPostCancel", orderId, reason);
    return res;
  }
}
