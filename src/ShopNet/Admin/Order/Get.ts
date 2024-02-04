import { ICartItem } from "~/Components/ShopCart";
import { Logger } from "~/Helpers/Logger";
import { IAdminOrderItem } from "~/Pages/Admin/Order";
import { IComment } from "~/Pages/History/Comment";
import { IOrderDetail } from "~/Pages/History/Detail";
import { ProductData } from "~/ShopNet/Product/Data";
import { ProductGet } from "~/ShopNet/Product/Get";
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
   * @since 0.5.0
   * @version 0.1.1
   */
  public static async List(pLog: Logger): Promise<IAdminOrderItem[]> {
    this.EnsureLogin();
    const log = pLog.With(...this.Log, "List");

    const list = await this.GetTimeCache<
      {
        OrderId: number;
        Products: number[];
        Quantity: number;
      }[]
    >("", "OrderGetList", (x) => x.add(1, "m"));

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

    return items.sort((a, b) => b.OrderDate.getTime() - a.OrderDate.getTime());
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  public static async Detail(orderId: number, pLog: Logger): Promise<IOrderDetail> {
    this.EnsureLogin();
    const log = pLog.With(...this.Log, "Detail");

    const meta = await this.GetTimeCache<
      {
        Items: {
          Types: number[];
          Quantity: number;
        }[],
        Comments: number[];
      }
    >(orderId, "OrderGetDetail", (x) => x.add(1, "m"), orderId);

    const items: ICartItem[] = [];
    let index = 0;

    for (const combo of meta.Items) {
      const variType: Record<string, string> = {};
      let prodId = 0;

      for (const typeId of combo.Types) {
        const type = await ProductData.Type(typeId);

        if (!type) {
          log.warn(`[Mismatch] Type ${typeId} not found. Order : ${orderId}`);
          continue;
        }

        const vari = await ProductData.Variant(type.VariantId);

        if (!vari) {
          log.warn(`[Mismatch] Variant ${type.VariantId} not found. Type : ${typeId}, Order : ${orderId}`);
          continue;
        }

        variType[vari.Name] = type.Name;
        prodId = vari.ProductId;
      }

      const prod = await ProductData.Product(prodId);

      if (!prod) {
        log.warn(`[Mismatch] Product ${prodId} not found. Order : ${orderId}`);
        continue;
      }

      const [_, cover] = await ProductGet.PhotoList(prodId, log);

      if (!cover)
        log.warn(`Product ${prodId} has no photo`);

      items.push({
        Id: index++,
        ProdId: prodId,
        Cover: cover || "",
        Name: prod.Name,
        Type: variType,
        Quantity: combo.Quantity,
      });
    }

    const comments: IComment[] = [];

    for (const cmtId of meta.Comments) {
      const cmt = await AdminOrderEntity.Comment(cmtId);

      if (!cmt) {
        log.warn(`[Mismatch] Comment ${cmtId} not found. Order : ${orderId}`);
        continue;
      }

      let name = "Client";

      if (cmt.UserId) {
        const user = await AdminUserEntity.User(cmt.UserId);

        if (user)
          name = user.Name;
        else
          log.warn(`[Mismatch] User ${cmt.UserId} not found. Order : ${orderId}`);
      }

      comments.push({
        Content: cmt.Content,
        Time: cmt.CreateAt,
        User: name
      });
    }

    return {
      ShopCart: items,
      Comments: comments.sort((a, b) => a.Time.getTime() - b.Time.getTime())
    };
  }

  public static Order = AdminOrderEntity.Order;
  public static Export = AdminOrderExport.Export;
}
