import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class OrderDelete extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static useDelete(options: Options<true, [number]>) {
    return useRequest(async orderId => {
      this.EnsureLogin();
      const res = await this.Invoke<boolean>("OrderDeleteCancelled", orderId);
      this.EnsureTrue(res);
      return res;
    }, options);
  }
}
