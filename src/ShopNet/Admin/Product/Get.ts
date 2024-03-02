import { useConst } from "@fluentui/react-hooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import type { Logger } from "~/Helpers/Logger";
import { useSWR } from "~/Helpers/useSWR";
import { IProductCount } from "~/Pages/Admin/Product";
import { ProductData } from "~/ShopNet/Product/Data";
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
      this.GetTimeCache<number[]>("", this.list, (x) => x.add(5, "s"))
        .catch(log.error)
    );

    return res;
  }
  /** @deprecated */
  public static ListUpdate(action: (raw: number[]) => number[]) {
    return this.UpdateCache(action, "", this.list, dayjs().add(5, "s"));
  }

  /**
   * @author Aloento
   * @since 1.3.0
   * @version 0.1.0
   */
  public static Count(prodId: number): Promise<IProductCount> {
    return this.GetTimeCache<IProductCount>(prodId, "ProductGetCount", (x) => x.add(5, "s"), prodId);
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

  public static readonly variants = "ProductGetVariants";
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 2.0.0
   */
  public static useVariants(prodId: number, options?: Options<number[], [number]>) {
    const index = useConst(() => this.Index(prodId, this.variants));

    const req = useSWR(
      index,
      async (id) => {
        await this.getLocker(index);
        this.reqPool.add(index);

        const list = await this.Invoke<number[]>(this.variants, id)
          .finally(() => this.reqPool.delete(index));

        return list;
      },
      {
        ...options,
        defaultParams: [prodId],
      }
    );

    return req;
  }

  public static readonly types = "ProductGetTypes";
  /**
   * @author Aloento
   * @since 1.4.5
   * @version 0.1.0
   */
  public static async Types(variantId: number) {
    return this.GetTimeCache<number[]>(variantId, this.types, (x) => x.add(5, "s"), variantId);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 2.0.0
   */
  public static useTypes(
    variantId: number,
    options?: Options<number[], [number]>
  ) {
    const index = useConst(() => this.Index(variantId, this.types));

    const req = useSWR(
      index,
      (variantId) => this.Invoke<number[]>(this.types, variantId),
      {
        ...options,
        defaultParams: [variantId]
      }
    );

    return req;
  }

  /**
   * @author Aloento
   * @since 1.4.0
   * @version 0.1.0
   */
  public static useTypeList(
    variantId: number,
    options?: Options<ProductData.Type[], []>
  ) {
    const { data } = this.useTypes(variantId);
    const index = useConst(() => this.Index(variantId, "TypeList"));

    const req = useSWR(
      index,
      async () => {
        if (!data)
          return [];

        const types: ProductData.Type[] = [];

        for (const typeId of data) {
          const type = await ProductData.Type(typeId);
          types.push(type);
        }

        return types;
      },
      {
        ...options,
        useMemory: true
      }
    );

    useEffect(() => {
      if (data)
        req.refresh();
    }, [data]);

    return req;
  }
}
