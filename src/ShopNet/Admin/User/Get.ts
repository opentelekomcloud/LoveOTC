import { IPersona } from "~/Components/ShopCart/Persona";
import { IUserItem } from "~/Pages/Admin/User";
import { AdminNet } from "../AdminNet";
import { AdminOrderEntity } from "../Order/Entity";
import { AdminUserEntity } from "./Entity";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminUserGet extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async OrderUser(orderId: number): Promise<IPersona> {
    const order = await AdminOrderEntity.Order(orderId);

    if (!order)
      throw new Error("Order not found");

    const user = await AdminUserEntity.User(order.UserId);

    if (!user)
      throw new Error("User not found");

    return user;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async List(): Promise<IUserItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<IUserItem[]>("UserGetList");
    return res;
  }
}
