import { IConcurrency } from "~/ShopNet/Database";
import { OrderEntity } from "~/ShopNet/Order/Entity";
import { AdminNet } from "../AdminNet";

export namespace AdminOrderEntity {
  export type Order = {
    UserId: string;
  } & OrderEntity.Order & IConcurrency;

  export type Comment = {
    UserId: string;
  } & Omit<OrderEntity.Comment, "Name"> & IConcurrency;
}

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
  public static Order(key: number): Promise<AdminOrderEntity.Order> {
    this.EnsureLogin();
    return this.GetVersionCache(key, OrderEntity.order);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Comment(key: number): Promise<AdminOrderEntity.Comment> {
    this.EnsureLogin();
    return this.GetVersionCache(key, OrderEntity.comment);
  }
}
