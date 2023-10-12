import { IPersona } from "~/Components/ShopCart/Persona";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class UserGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Me(): Promise<IPersona> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const res = await this.Hub.invoke<IPersona>("UserGetMe");
    return res;
  }
}
