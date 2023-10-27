import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

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
  public static Order(key: number): Promise<({
    Status: string;
    CreateAt: Date;
    TrackingNumber?: string;
  } & IConcurrency) | void> {
    this.EnsureLogin();
    return this.WithVersionCache(key, "OrderEntity");
  }
}
