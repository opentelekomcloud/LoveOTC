import { Options } from "ahooks/lib/useRequest/src/types";
import type { Logger } from "~/Helpers/Logger";
import { useSWR } from "~/Helpers/useSWR";
import { IComboItem } from "~/Pages/Admin/Product/Combo";
import type { IGallery } from "~/Pages/Gallery";
import { ProductData } from "./Data";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export abstract class ProductGet extends ProductData {
  /** "Product", "Get" */
  protected static override readonly Log = [...super.Log, "Product", "Get"];

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.2.0
   * @liveSafe
   */
  public static async Basic(prodId: number, pLog: Logger): Promise<IGallery> {
    const log = pLog.With(...this.Log, "Basic");

    const res = await this.Product(prodId);
    if (!res)
      throw new Error(`Product ${prodId} Not Found`);

    const [coverId] = await this.PhotoList(prodId, true);
    const cover = await this.Photo(coverId);

    if (cover)
      return {
        Name: res.Name,
        Cover: cover.ObjectId
      };

    log.warn(`Product ${prodId} has no photo`);
    return {
      Name: res.Name,
      Cover: "",
    };
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.1
   */
  public static Limit(prodId: number): Promise<number> {
    return this.Invoke<number>("ProdGetLimit", prodId);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.2.0
   * @liveSafe
   */
  public static async ComboList(prodId: number, pLog: Logger): Promise<IComboItem[]> {
    const log = pLog.With(...this.Log, "Combo");

    const list = await this.GetTimeCache<number[]>(prodId, "ProductGetComboList", (x) => x.add(3, "s"), prodId);
    const items: IComboItem[] = [];

    for (const comboId of list) {
      const combo = await this.Combo(comboId);

      const variType: Record<string, string> = {};

      for (const typeId of combo.Types) {
        const type = await this.Type(typeId);

        if (!type) {
          log.error(`[Mismatch] Type ${typeId} not found. Combo ${comboId} : Product ${prodId}`);
          continue;
        }

        const vari = await this.Variant(type.VariantId);

        if (!vari) {
          log.error(`[Mismatch] Variant ${type.VariantId} not found. Combo ${comboId} : Type ${typeId} : Product ${prodId}`);
          continue;
        }

        variType[vari.Name] = type.Name;
      }

      items.push({
        Id: comboId,
        Stock: combo.Stock,
        Combo: variType,
      });
    }

    return items;
  }

  public static readonly photoList = "ProductGetPhotoList";
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 2.0.1
   * @liveSafe
   * @deprecated Use {@link usePhotoList} if possible.
   */
  public static async PhotoList(prodId: number, cache?: true): Promise<number[]> {
    if (cache)
      return this.GetTimeCache<number[]>(prodId, this.photoList, (x) => x.add(3, "s"), prodId);

    const index = this.Index(prodId, this.photoList);
    await this.getLocker(index);
    this.reqPool.add(index);

    const ids = await this.Invoke<number[]>(this.photoList, prodId)
      .finally(() => this.reqPool.delete(index));

    return ids;
  }

  /**
   * @author Aloento
   * @since 1.4.0
   * @version 0.3.0
   */
  public static usePhotoList(prodId: number, options?: Options<number[], number[]>) {
    const req = useSWR(
      this.Index(prodId, this.photoList),
      (id) => this.PhotoList(id),
      {
        ...options,
        defaultParams: [prodId],
      }
    );

    return req;
  }
}
