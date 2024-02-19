import { Logger } from "~/Helpers/Logger";
import { IAdminOrderItem } from "~/Pages/Admin/Order";
import { ProductData } from "~/ShopNet/Product/Data";
import { AdminNet } from "../AdminNet";
import { AdminUserEntity } from "../User/Entity";
import { AdminOrderEntity } from "./Entity";
import { AdminOrderExport } from "./Export";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export abstract class AdminOrderGet extends AdminNet {
  /** "Order", "Get" */
  protected static override readonly Log = [...super.Log, "Order", "Get"];

  /**
   * @author Aloento
   * @since 1.3.5
   * @version 0.1.0
   */
  public static Count(): Promise<number> {
    this.EnsureLogin();
    return this.GetTimeCache<number>("", "OrderGetCount", (x) => x.add(1, "m"));
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async List(page: number, pLog: Logger): Promise<IAdminOrderItem[]> {
    this.EnsureLogin();
    const log = pLog.With(...this.Log, "List");

    const list = await this.GetTimeCache<
      {
        OrderId: number;
        Products: number[];
        Quantity: number;
      }[]
    >(page, "OrderGetList", (x) => x.add(1, "m"), page);

    const items: IAdminOrderItem[] = [];

    for (const meta of list) {
      const order = await AdminOrderEntity.Order(meta.OrderId);

      if (!order) {
        log.warn(`[Mismatch] Order ${meta.OrderId} not found`);
        continue;
      }

      const prodNames: string[] = [];

      for (const prodId of meta.Products) {
        const prod = await ProductData.Product(prodId);

        if (!prod) {
          log.warn(`[Mismatch] Product ${prodId} not found`);
          continue;
        }

        prodNames.push(prod.Name);
      }

      const user = await AdminUserEntity.User(order.UserId);

      if (!user) {
        log.error(`[Mismatch] User ${order.UserId} not found`);
        continue;
      }

      items.push({
        Id: meta.OrderId,
        Items: prodNames,
        Quantity: meta.Quantity,
        Status: order.Status,
        TrackNumber: order.TrackingNumber,
        OrderDate: order.CreateAt,
        User: user.Name,
      });
    }

    return items;
  }

  public static Order = AdminOrderEntity.Order;
  public static Export = AdminOrderExport.Export;
}
