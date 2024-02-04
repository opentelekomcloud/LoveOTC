import { IConcurrency } from "~/ShopNet/Database";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class AdminOrderEntity extends AdminNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Order(key: number): Promise<({
    UserId: string;
    Status: string;
    CreateAt: Date;
    TrackingNumber?: string;
  } & IConcurrency)> {
    this.EnsureLogin();
    return this.GetVersionCache(key, "OrderEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Comment(key: number): Promise<({
    Content: string;
    UserId?: string;
    CreateAt: Date;
  } & IConcurrency)> {
    this.EnsureLogin();
    return this.GetVersionCache(key, "CommentEntity");
  }
}
