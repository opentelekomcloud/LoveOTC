import { IOrderItem } from "~/Pages/History";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminOrderGet extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async List(): Promise<IOrderItem[]> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<Omit<IOrderItem & { OrderId: number }, "Id">[]>("OrderGetList");

    return res.map(x => {
      const { OrderId, ...rest } = x;
      return {
        Id: OrderId,
        ...rest
      };
    });
  }
}
