import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class AdminUserDelete extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useUser(options: Options<true, [string]>) {
    return useRequest((userId) => this.Invoke("UserDeleteUser", userId), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useAdmin(options: Options<true, [string]>) {
    return useRequest((userId) => this.Invoke("UserDeleteAdmin", userId), options);
  }
}
