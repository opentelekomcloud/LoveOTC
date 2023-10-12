import { IPersona } from "~/Components/ShopCart/Persona";
import { createUID } from "~/Lexical/Utils/createUID";
import { IUserItem } from "~/Pages/Admin/User";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminUserGet extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async OrderUser(orderId: number): Promise<IPersona> {
    return {
      Name: "Aloento",
      Phone: "+36 300000000",
      EMail: "Aloento@T-Systems.com",
      Address: Array(10).fill(0).map(() => createUID()).reduce((prev, curr) => prev + curr, ""),
    }
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async List(): Promise<IUserItem[]> {
    const items: IUserItem[] = [
      {
        Id: 1,
        Name: "Aloento",
        EMail: "Aloento@T-Systems.com",
        Admin: true
      },
      {
        Id: 2,
        Name: "SomeOne",
        EMail: "SomeOne@T-Systems.com",
      },
    ]

    return items;
  }
}
