import dayjs from "dayjs";
import { IProductItem } from "~/Pages/Admin/Product";
import { IVariantItem } from "~/Pages/Admin/Product/Variant";
import { ProductEntity } from "~/ShopNet/Product/Entity";
import { ProductGet } from "~/ShopNet/Product/Get";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminProductGet extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async List(): Promise<IProductItem[]> {
    const list = await this.WithTimeCache<typeof AdminProductGet,
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
        console.error(`Product ${meta.ProductId} Not Found`);
        continue;
      }

      const photos = await ProductGet.PhotoList(meta.ProductId);
      const cover = await this.FindCover(photos, meta.ProductId);

      if (!cover)
        console.warn(`Product ${meta.ProductId} has no photo`);

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
   * @version 0.1.0
   */
  public static async Name(prodId: number): Promise<string> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<string>("ProductGetName", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Category(prodId: number): Promise<string> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<string>("ProductGetCategory", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Variants(prodId: number): Promise<IVariantItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<Omit<IVariantItem & { VariantId: number }, "Id">[]>("ProductGetVariants", prodId);

    return res.map(x => {
      const { VariantId, ...rest } = x;
      return {
        Id: VariantId,
        ...rest
      };
    });
  }
}
