import { IComboItem } from "~/Pages/Admin/Product/Combo";
import { IPhotoItem } from "~/Pages/Admin/Product/Photo";
import { IProductInfo } from "~/Pages/Gallery";
import { ShopNet } from "../ShopNet";
// import demo from "./demo.json";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class ProductGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Basic(prodId: number): Promise<IProductInfo> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<IProductInfo>("ProdGetBasic", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Limit(prodId: number): Promise<number> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<number>("ProdGetLimit", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static async Combo(prodId: number): Promise<IComboItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<Omit<IComboItem & { ComboId: number }, "Id">[]>("ProdGetCombo", prodId);

    return res.map(x => {
      const { ComboId, ...rest } = x;
      return {
        Id: ComboId,
        ...rest,
      };
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static async Carousel(prodId: number): Promise<IPhotoItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<Omit<IPhotoItem & { PhotoId: number }, "Id">[]>("ProdGetCarousel", prodId);

    return res.map(x => {
      const { PhotoId, ...rest } = x;
      return {
        Id: PhotoId,
        ...rest,
      };
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Lexical(id: number): Promise<string> {
    await this.EnsureConnected();

    // return JSON.stringify(demo.editorState);
    return "This is a demo";
  }
}
