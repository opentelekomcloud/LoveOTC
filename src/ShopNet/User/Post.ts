import { IPersona } from "~/Components/ShopCart/Persona";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IPostPersona extends Partial<IPersona> {
  UID?: string;
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
    throw new Error("some");
  }
}
