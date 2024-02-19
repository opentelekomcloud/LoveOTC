import { useConst } from "@fluentui/react-hooks";
import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import type { IComment } from "~/Components/Order/Comment";
import type { ICartItem } from "~/Components/ShopCart";
import { Logger } from "~/Helpers/Logger";
import type { IOrderItem } from "~/Pages/History";
import { AdminNet } from "../Admin/AdminNet";
import { AdminOrderEntity } from "../Admin/Order/Entity";
import { AdminUserEntity } from "../Admin/User/Entity";
import { ProductData } from "../Product/Data";
import { ProductGet } from "../Product/Get";
import { OrderEntity } from "./Entity";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export abstract class OrderGet extends OrderEntity {
  /** "Order", "Get" */
  protected static override readonly Log = [...super.Log, "Order", "Get"];

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.1
   */
  public static async List(pLog: Logger): Promise<IOrderItem[]> {
    this.EnsureLogin();
    const log = pLog.With(...this.Log, "List");

    const list = await this.GetTimeCache<
      {
        OrderId: number;
        Products: number[];
        Quantity: number;
      }[]
    >("", "OrderGetList", (x) => x.add(1, "m"));

    const items: IOrderItem[] = [];

    for (const meta of list) {
      const order = await this.Order(meta.OrderId);

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

      items.push({
        Id: meta.OrderId,
        Items: prodNames,
        Quantity: meta.Quantity,
        Status: order.Status,
        TrackNumber: order.TrackingNumber,
        OrderDate: order.CreateAt
      });
    }

    return items.sort((a, b) => b.OrderDate.getTime() - a.OrderDate.getTime());
  }

  public static readonly items = "OrderGetItems";
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 2.1.0
   */
  public static useItems(orderId: number, pLog: Logger, admin?: true) {
    const log = useConst(() => pLog.With(...this.Log, "Items"));
    const [res, setRes] = useState<ICartItem[]>();

    const req = (admin ? AdminNet : this).useTimeCache<
      {
        Types: number[];
        Quantity: number;
      }[]
    >(
      orderId,
      this.items,
      {
        defaultParams: [orderId],
        onError: log.error
      }
    );

    useAsyncEffect(async () => {
      const meta = req.data;
      if (!meta)
        return;

      const items: ICartItem[] = [];
      let index = 0;

      for (const combo of meta) {
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

      setRes(items);
    }, [req.data]);

    return {
      ...req,
      data: res
    };
  }

  /**
   * @author Aloento
   * @since 1.3.5
   * @version 1.0.0
   */
  public static useCmts(orderId: number, pLog: Logger, admin?: true) {
    const log = useConst(() => pLog.With(...this.Log, "Cmts"));
    const [res, setRes] = useState<IComment[]>();

    const req = (admin ? AdminNet : this).useTimeCache<number[]>(
      orderId,
      "OrderGetCmts",
      {
        defaultParams: [orderId],
        onError: log.error
      }
    );

    useAsyncEffect(async () => {
      const cmts = req.data;
      if (!cmts)
        return;

      const comments: IComment[] = [];

      if (admin)
        for (const cmtId of cmts) {
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
      else
        for (const cmtId of cmts) {
          const cmt = await this.Comment(cmtId);

          if (!cmt) {
            log.warn(`[Mismatch] Comment ${cmtId} not found. Order : ${orderId}`);
            continue;
          }

          comments.push({
            Content: cmt.Content,
            Time: cmt.CreateAt,
            User: cmt.Name || "You"
          });
        }

      setRes(comments.sort((a, b) => a.Time.getTime() - b.Time.getTime()));
    }, [req.data]);

    return {
      ...req,
      data: res
    };
  }
}
