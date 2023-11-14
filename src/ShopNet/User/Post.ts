import { IPersona } from "~/Components/ShopCart/Persona";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class UserPost extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.1
   */
  public static async Update(req: Partial<IPersona>): Promise<true> {
    this.EnsureLogin();
    const res = await this.Invoke<true>("UserPostUpdate", req);
    return res;
  }
}
