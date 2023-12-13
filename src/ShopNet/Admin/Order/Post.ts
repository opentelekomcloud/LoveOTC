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
   * @version 0.2.0
   */
  public static useAppend(options: Options<true, [number, string]>) {
    return useRequest((orderId, cmt) => this.Invoke("OrderPostAppend", orderId, cmt), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useClose(options: Options<true, [number, string]>) {
    return useRequest((orderId, reason) => this.Invoke("OrderPostClose", orderId, reason), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useShip(options: Options<true, [number, string | undefined]>) {
    return useRequest((orderId, track) => this.Invoke("OrderPostShip", orderId, track), options);
  }
}
