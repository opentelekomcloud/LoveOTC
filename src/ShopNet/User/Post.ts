import { useRequest } from "ahooks";
import type { Options } from "ahooks/lib/useRequest/src/types";
import { IPersona } from "~/Components/ShopCart/Persona";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class UserPost extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useUpdate(options: Options<true, [Partial<IPersona>]>) {
    return useRequest(req => {
      this.EnsureLogin();
      return this.Invoke("UserPostUpdate", req);
    }, options);
  }
}
