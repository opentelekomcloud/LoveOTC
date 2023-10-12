import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminOrderPost extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Append(orderId: number, cmt: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("OrderPostAppend", orderId, cmt);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Close(orderId: number, reason: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("OrderPostClose", orderId, reason);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Ship(orderId: number, track: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("OrderPostShip", orderId, track);
    return res;
  }
}
