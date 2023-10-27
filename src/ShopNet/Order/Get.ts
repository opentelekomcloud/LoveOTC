import dayjs from "dayjs";
import { ICartItem } from "~/Components/ShopCart";
import { IOrderItem } from "~/Pages/History";
import { IComment } from "~/Pages/History/Comment";
import { IOrderDetail } from "~/Pages/History/Detail";
import { ProductEntity } from "../Product/Entity";
import { ProductGet } from "../Product/Get";
import { ShopNet } from "../ShopNet";
import { OrderEntity } from "./Entity";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class OrderGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async List(): Promise<IOrderItem[]> {
    this.EnsureLogin();

    const list = await this.WithTimeCache<typeof OrderGet,
      {
        OrderId: number;
        Products: number[];
        Quantity: number;
      }[]
    >("", "OrderGetList", dayjs().add(1, "m"));

    const items: IOrderItem[] = [];

    for (const meta of list) {
      const order = await this.Order(meta.OrderId);

      if (!order) {
        console.error(`OrderGetList Mismatch: Order ${meta.OrderId} not found`);
        continue;
      }

      const prodNames: string[] = [];

      for (const prodId of meta.Products) {
        const prod = await ProductEntity.Product(prodId);

        if (!prod) {
          console.error(`OrderGetList Mismatch: Product ${prodId} not found`);
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
        OrderDate: order.CreateAt
      });
    }

    return items;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Detail(orderId: number): Promise<IOrderDetail> {
    this.EnsureLogin();

    const meta = await this.WithTimeCache<typeof OrderGet,
      {
        Items: {
          Types: number[];
          Quantity: number;
        }[],
        Comments: number[];
      }
    >(orderId, "OrderGetDetail", dayjs().add(1, "m"), orderId);

    const items: ICartItem[] = [];
    let index = 0;

    for (const combo of meta.Items) {
      const variType: Record<string, string> = {};
      let prodId = 0;

      for (const typeId of combo.Types) {
        const type = await ProductEntity.Type(typeId);

        if (!type) {
          console.error(`OrderGetDetail Mismatch: Type ${typeId} not found. Order : ${orderId}`);
          continue;
        }

        const vari = await ProductEntity.Variant(type.VariantId);

        if (!vari) {
          console.error(`OrderGetDetail Mismatch: Variant ${type.VariantId} not found. Type : ${typeId}, Order : ${orderId}`);
          continue;
        }

        variType[vari.Name] = type.Name;
        prodId = vari.ProductId;
      }

      const prod = await ProductEntity.Product(prodId);

      if (!prod) {
        console.error(`OrderGetDetail Mismatch: Product ${prodId} not found. Order : ${orderId}`);
        continue;
      }

      const list = await ProductGet.PhotoList(prodId);
      const cover = await this.FindCover(list, prodId);

      if (!cover)
        console.warn(`Product ${prodId} has no photo`);

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
      const cmt = await OrderEntity.Comment(cmtId);

      if (!cmt) {
        console.error(`OrderGetDetail Mismatch: Comment ${cmtId} not found. Order : ${orderId}`);
        continue;
      }

      comments.push({
        Content: cmt.Content,
        Time: cmt.CreateAt,
        User: cmt.UserId || "You"
      });
    }

    return {
      ShopCart: items,
      Comments: comments
    };
  }

  public static Order = OrderEntity.Order;
}
