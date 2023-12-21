import dayjs from "dayjs";
import type { Logger } from "~/Helpers/Logger";
import { IProductItem } from "~/Pages/Admin/Product";
import { IVariantItem } from "~/Pages/Admin/Product/Variant";
import { ProductEntity } from "~/ShopNet/Product/Entity";
import { ProductGet } from "~/ShopNet/Product/Get";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export abstract class AdminProductGet extends AdminNet {
  /** "Product", "Get" */
  protected static override readonly Log = [...super.Log, "Product", "Get"];

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.1
   */
  public static async List(pLog: Logger): Promise<IProductItem[]> {
    const log = pLog.With(...this.Log, "List");

    const list = await this.WithTimeCache<
      {
        ProductId: number;
        Variant: number;
        Combo: number;
        Stock: number;
      }[]
    >("", "ProductGetList", dayjs().add(1, "m"));

    const items: IProductItem[] = [];

    for (const meta of list) {
      const prod = await ProductEntity.Product(meta.ProductId);

      if (!prod) {
        log.warn(`Product ${meta.ProductId} Not Found`);
        continue;
      }

      const photos = await ProductGet.PhotoList(meta.ProductId);
      const cover = await this.FindCover(photos, meta.ProductId, log);

      if (!cover)
        log.warn(`Product ${meta.ProductId} has no photo`);

      items.push({
        Id: meta.ProductId,
        Cover: cover || "",
        Name: prod.Name,
        Category: prod.Category || "Pending",
        Variant: meta.Variant,
        Combo: meta.Combo,
        Stock: meta.Stock
      });
    }

    return items;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Name(prodId: number): Promise<string> {
    const prod = await ProductEntity.Product(prodId);

    if (!prod)
      throw new Error(`Product ${prodId} Not Found`);

    return prod.Name;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Category(prodId: number): Promise<string | undefined> {
    const prod = await ProductEntity.Product(prodId);

    if (!prod)
      throw new Error(`Product ${prodId} Not Found`);

    return prod.Category;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.1
   */
  public static async Variants(prodId: number, pLog: Logger): Promise<IVariantItem[]> {
    const log = pLog.With(...this.Log, "Variants");

    const list = await this.WithTimeCache<
      {
        VariantId: number;
        Types: number[];
      }[]
    >(prodId, "ProductGetVariants", dayjs().add(1, "m"), prodId);

    const items: IVariantItem[] = [];

    for (const meta of list) {
      const vari = await ProductEntity.Variant(meta.VariantId);

      if (!vari) {
        log.warn(`Variant ${meta} Not Found. Product : ${prodId}`);
        continue;
      }

      const types: string[] = [];

      for (const typeId of meta.Types) {
        const type = await ProductEntity.Type(typeId);

        if (!type) {
          log.warn(`Type ${typeId} Not Found. Variant : ${meta.VariantId}, Product : ${prodId}`);
          continue;
        }

        types.push(type.Name);
      }

      items.push({
        Id: meta.VariantId,
        Name: vari.Name,
        Types: types
      });
    }

    return items;
  }
}
