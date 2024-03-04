import { IConcurrency } from "~/ShopNet/Database";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class AdminUserEntity extends AdminNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.0
   */
  public static User(key: string): Promise<({
    Surname: string;
    Forename: string;
    EMail: string;
    Phone: string;
    Address: string;
    Admin?: boolean;
  } & IConcurrency)> {
    this.EnsureLogin();
    return this.GetVersionCache(key, "UserEntity");
  }
}
