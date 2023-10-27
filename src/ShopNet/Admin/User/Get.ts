import { IPersona } from "~/Components/ShopCart/Persona";
import { IUserItem } from "~/Pages/Admin/User";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminUserGet extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async OrderUser(orderId: number): Promise<IPersona> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<IPersona>("UserGetOrderUser", orderId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async List(): Promise<IUserItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<IUserItem[]>("UserGetList");
    return res;
  }
}
