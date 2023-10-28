import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class UserGet extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Me(key: string): Promise<({
    Name: string;
    EMail: string;
    Phone: string;
    Address: string;
  } & IConcurrency) | void> {
    this.EnsureLogin();
    return this.WithVersionCache(key, "UserEntity");
  }
}
