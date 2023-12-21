import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { ICartItem } from "~/Components/ShopCart";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class OrderPost extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.3.0
   */
  public static useNew(options: Options<number, [ICartItem[], string | undefined]>) {
    return useRequest((cart, cmt) => {
      this.EnsureLogin();

      const req = cart.map(x => {
        return {
          ProdId: x.ProdId,
          Type: Object.values(x.Type),
          Quantity: x.Quantity,
        };
      });

      return this.Invoke("OrderPostNew", req, cmt);
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useAppend(options: Options<true, [number, string]>) {
    return useRequest(async (orderId, cmt) => {
      this.EnsureLogin();
      const res = await this.Invoke<boolean>("OrderPostAppend", orderId, cmt);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCancel(options: Options<true, [number, string]>) {
    return useRequest(async (orderId, reason) => {
      this.EnsureLogin();
      const res = await this.Invoke<boolean>("OrderPostCancel", orderId, reason);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static useReceived(options: Options<true, [number]>) {
    return useRequest(async orderId => {
      this.EnsureLogin();
      const res = await this.Invoke<boolean>("OrderPostReceived", orderId);
      this.EnsureTrue(res);
      return res;
    }, options);
  }
}
