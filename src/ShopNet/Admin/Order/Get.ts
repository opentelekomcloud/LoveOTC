import dayjs from "dayjs";
import { IAdminOrderItem } from "~/Pages/Admin/Order";
import { ProductEntity } from "~/ShopNet/Product/Entity";
import { AdminNet } from "../AdminNet";
import { AdminOrderEntity } from "./Entity";

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
  public static async List(): Promise<IAdminOrderItem[]> {
    this.EnsureLogin();

    const list = await this.WithTimeCache<
      {
        OrderId: number;
        Products: number[];
        Quantity: number;
      }[]
    >("", "OrderGetList", dayjs().add(1, "m"));

    const items: IAdminOrderItem[] = [];

    for (const meta of list) {
      const order = await AdminOrderEntity.Order(meta.OrderId);

      if (!order) {
        console.error(`AdminOrderGetList Mismatch: Order ${meta.OrderId} not found`);
        continue;
      }

      const prodNames: string[] = [];

      for (const prodId of meta.Products) {
        const prod = await ProductEntity.Product(prodId);

        if (!prod) {
          console.error(`AdminOrderGetList Mismatch: Product ${prodId} not found`);
          continue;
        }

        prodNames.push(prod.Name);
      }

      items.push({
        Id: meta.OrderId,
        Items: prodNames,
        Quantity: meta.Quantity,
        Status: order.Status,
        TrackNumber: order.TrackingNumber,
        OrderDate: order.CreateAt,
        User: order.UserId
      });
    }

    return items.sort((a, b) => b.OrderDate.getTime() - a.OrderDate.getTime());
  }
}
