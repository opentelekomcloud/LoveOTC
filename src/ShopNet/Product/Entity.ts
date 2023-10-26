import { IProductInfo } from "~/Pages/Gallery";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class ProductEntity extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static async Basic(prodId: number): Promise<IProductInfo> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<IProductInfo>("ProdGetBasic", prodId);
    return res;
  }
}
