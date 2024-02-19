import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class AdminOrderPost extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.1
   */
  public static useAppend(options: Options<true, [number, string]>) {
    return useRequest(async (orderId, cmt) => {
      const res = await this.Invoke<boolean>("OrderPostAppend", orderId, cmt);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.3.0
   */
  public static useClose(options: Options<string, [number, string]>) {
    return useRequest((orderId, reason) => this.Invoke("OrderPostClose", orderId, reason), options);
  }
  public static useCancel = this.useClose;

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useShip(options: Options<true, [number, string | undefined]>) {
    return useRequest(async (orderId, track) => {
      const res = await this.Invoke<boolean>("OrderPostShip", orderId, track);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static useAccept(options: Options<true, [number]>) {
    return useRequest(async orderId => {
      const res = await this.Invoke<boolean>("OrderPostAccept", orderId);
      this.EnsureTrue(res);
      return res;
    }, options);
  }
}
