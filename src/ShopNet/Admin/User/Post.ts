import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminUserPost extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Admin(userId: string): Promise<true> {
    const res = await this.Invoke<true>("UserPostAdmin", userId);
    return res;
  }
}
