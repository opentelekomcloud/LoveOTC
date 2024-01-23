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
    Name?: string;
    CreateAt: Date;
  } & IConcurrency;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class OrderEntity extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Order(key: number): Promise<OrderEntity.Order> {
    this.EnsureLogin();
    return this.GetVersionCache(key, "OrderEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Comment(key: number): Promise<OrderEntity.Comment> {
    this.EnsureLogin();
    return this.GetVersionCache(key, "CommentEntity");
  }
}
