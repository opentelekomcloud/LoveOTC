import { IPersona } from "~/Components/ShopCart/Persona";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IPostPersona extends Partial<IPersona> {
  UId?: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class UserPost extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Update(req: IPostPersona): Promise<true> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const res = await this.Hub.invoke<true>("UserPostUpdate", req);
    return res;
  }
}
