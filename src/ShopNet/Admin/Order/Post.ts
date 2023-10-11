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
  public static async Append(id: number, cmt: string): Promise<true> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Close(id: number, reason: string): Promise<true> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Ship(id: number, track: string): Promise<true> {
    throw new Error("TODO");
  }
}
