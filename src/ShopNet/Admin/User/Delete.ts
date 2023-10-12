import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminUserDelete extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async User(userId: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("UserDeleteUser", userId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Admin(userId: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("UserDeleteAdmin", userId);
    return res;
  }
}
