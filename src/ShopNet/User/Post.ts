import { useRequest } from "ahooks";
import type { Options } from "ahooks/lib/useRequest/src/types";
import type { IPersona } from "~/Components/ShopCart/Persona";
import { ShopNet } from "../ShopNet";
import { IUserGetMe } from "./Get";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export abstract class UserPost extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.3.1
   */
  public static useUpdate(options: Options<true, [Partial<IPersona>]>) {
    return useRequest(async req => {
      this.EnsureLogin();
      const res = await this.Invoke<boolean>("UserPostUpdate", req);

      this.EnsureTrue(res);
      this.UpdateCache<IUserGetMe>(raw => ({ ...raw, ...req }), 0, "UserGetMe");

      return res;
    }, options);
  }
}
