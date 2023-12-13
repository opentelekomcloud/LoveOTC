import dayjs from "dayjs";
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
export abstract class AdminUserGet extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async OrderUser(orderId: number): Promise<IPersona> {
    const order = await AdminOrderEntity.Order(orderId);

    if (!order)
      throw new Error(`Order ${orderId} not found`);

    const user = await AdminUserEntity.User(order.UserId);

    if (!user)
      throw new Error(`User ${order.UserId} not found in order ${orderId}`);

    return user;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async List(): Promise<IUserItem[]> {
    const list = await this.WithTimeCache<string[]>("", "UserGetList", dayjs().add(1, "m"));
    const res: IUserItem[] = [];

    for (const userId of list) {
      const user = await AdminUserEntity.User(userId);

      if (!user) {
        console.warn(`User ${userId} not found`);
        continue;
      }

      res.push({
        Id: userId,
        Name: user.Name,
        EMail: user.EMail,
        Admin: user.Admin,
      });
    }

    return res;
  }
}
