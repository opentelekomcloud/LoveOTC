import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

export namespace OrderEntity {
  export type Order = {
    Status: string;
    CreateAt: Date;
    TrackingNumber?: string;
  } & IConcurrency;

  export type Comment = {
    Content: string;
    Forename?: string;
    CreateAt: Date;
  } & IConcurrency;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class OrderEntity extends ShopNet {
  public static readonly order = "OrderEntity";
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Order(key: number): Promise<OrderEntity.Order> {
    this.EnsureLogin();
    return this.GetVersionCache(key, this.order);
  }

  public static readonly comment = "CommentEntity";
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Comment(key: number): Promise<OrderEntity.Comment> {
    this.EnsureLogin();
    return this.GetVersionCache(key, this.comment);
  }
}
