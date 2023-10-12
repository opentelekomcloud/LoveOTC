import { IProductItem } from "~/Pages/Admin/Product";
import { IVariantItem } from "~/Pages/Admin/Product/Variant";
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
   * @version 0.1.0
   */
  public static async List(): Promise<IProductItem[]> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<Omit<IProductItem & { ProductId: number }, "Id">[]>("ProductGetList");

    return res.map(x => {
      const { ProductId, ...rest } = x;
      return {
        Id: ProductId,
        ...rest
      };
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Name(prodId: number): Promise<string> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<string>("ProductGetName", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Category(prodId: number): Promise<string> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<string>("ProductGetCategory", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Variants(prodId: number): Promise<IVariantItem[]> {
    await this.EnsureAdmin();
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
