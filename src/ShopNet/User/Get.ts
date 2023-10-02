import { IPersona } from "~/Components/ShopCart/Persona";
import { createUID } from "~/Lexical/Utils/createUID";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class UserGet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Me(): Promise<IPersona> {
    return {
      Name: "Aloento",
      Phone: "+36 300000000",
      EMail: "Aloento@T-Systems.com",
      Address: Array(10).fill(0).map(() => createUID()).reduce((prev, curr) => prev + curr, ""),
    }
  }
}
