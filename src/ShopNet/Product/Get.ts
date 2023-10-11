import { IComboItem } from "~/Pages/Admin/Product/Combo";
import { IPhotoItem } from "~/Pages/Admin/Product/Photo";
import { IProductInfo } from "~/Pages/Gallery";
import { ShopNet } from "../ShopNet";
import demo from "./demo.json";

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
    const res = await this.Hub.invoke<IProductInfo>("Basic", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Limit(prodId: number): Promise<number> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<number>("Limit", prodId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static async Combo(prodId: number): Promise<IComboItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<Omit<IComboItem & { ComboId: number }, "Id">[]>("Combo", prodId);

    return res.map(x => ({
      Id: x.ComboId,
      Combo: x.Combo,
      Stock: x.Stock,
    }));
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static async Carousel(prodId: number): Promise<IPhotoItem[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<Omit<IPhotoItem & { ObjId: number }, "Id">[]>("Carousel", prodId);

    return res.map(x => ({
      Id: x.ObjId,
      Cover: x.Cover,
      Caption: x.Caption,
    }));
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Lexical(id: number): Promise<string> {
    await this.EnsureConnected();

    return JSON.stringify(demo.editorState);
  }
}
