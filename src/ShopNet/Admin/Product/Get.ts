import { useConst } from "@fluentui/react-hooks";
import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";
import type { Logger } from "~/Helpers/Logger";
import { IProductCount } from "~/Pages/Admin/Product";
import { IVariantItem } from "~/Pages/Admin/Product/Variant";
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

  public static readonly list = "ProductGetList";

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 3.0.0
   */
  public static useList(pLog: Logger): number[] | void {
    const log = useConst(() => pLog.With(...this.Log, "List"));

    const res = useLiveQuery(() =>
      this.GetTimeCache<number[]>("", this.list, (x) => x.add(1, "m"))
        .catch(log.error)
    );

    return res;
  }
  public static ListUpdate(action: (raw: number[]) => number[]) {
    return this.UpdateCache(action, "", this.list, dayjs().add(1, "m"));
  }

  /**
   * @author Aloento
   * @since 1.3.0
   * @version 0.1.0
   */
  public static Count(prodId: number): Promise<IProductCount> {
    return this.GetTimeCache<IProductCount>(prodId, "ProductGetCount", (x) => x.add(1, "m"), prodId);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Name(prodId: number): Promise<string> {
    const prod = await ProductGet.Product(prodId);

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
    const prod = await ProductGet.Product(prodId);

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

    const list = await this.GetTimeCache<
      {
        VariantId: number;
        Types: number[];
      }[]
    >(prodId, "ProductGetVariants", (x) => x.add(1, "m"), prodId);

    const items: IVariantItem[] = [];

    for (const meta of list) {
      const vari = await ProductGet.Variant(meta.VariantId);

      if (!vari) {
        log.warn(`Variant ${meta} Not Found. Product : ${prodId}`);
        continue;
      }

      const types: string[] = [];

      for (const typeId of meta.Types) {
        const type = await ProductGet.Type(typeId);

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
