import dayjs from "dayjs";
import { IComboItem } from "~/Pages/Admin/Product/Combo";
import { IPhotoItem } from "~/Pages/Admin/Product/Photo";
import { IProductInfo } from "~/Pages/Gallery";
import { ShopNet } from "../ShopNet";
import { ProductEntity } from "./Entity";
// import demo from "./demo.json";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class ProductGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Basic(prodId: number): Promise<IProductInfo> {
    const res = await ProductEntity.Product(prodId);
    if (!res)
      throw new Error(`Product ${prodId} Not Found`);

    const list = await this.PhotoList(prodId);
    const cover = await this.FindCover(list, prodId);

    if (cover)
      return {
        Name: res.Name,
        Cover: cover
      };

    console.warn(`Product ${prodId} has no photo`);
    return {
      Name: res.Name,
      Cover: "",
    };
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
   * @version 1.0.0
   */
  public static async Combo(prodId: number): Promise<IComboItem[]> {
    const list = await this.ComboList(prodId);
    const items: IComboItem[] = [];

    for (const combo of list) {
      const variType: Record<string, string> = {};

      for (const typeId of combo.Types) {
        const type = await ProductEntity.Type(typeId);

        if (!type) {
          console.error(`ComboList Mismatch: Type ${typeId} not found. Combo ${combo.ComboId} : Product ${prodId}`);
          continue;
        }

        const vari = await ProductEntity.Variant(type.VariantId);

        if (!vari) {
          console.error(`ComboList Mismatch: Variant ${type.VariantId} not found. Combo ${combo.ComboId} : Type ${typeId} : Product ${prodId}`);
          continue;
        }

        variType[vari.Name] = type.Name;
      }

      items.push({
        Id: combo.ComboId,
        Stock: combo.Stock,
        Combo: variType,
      });
    }

    return items;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Carousel(prodId: number): Promise<IPhotoItem[]> {
    const list = await this.PhotoList(prodId);
    const photos: IPhotoItem[] = [];

    for (let i = 0; i < list.length; i++) {
      const id = list[i];
      const p = await ProductEntity.Photo(id);

      if (p)
        photos.push({
          Id: p.Order,
          Cover: p.ObjectId,
          Caption: p.Caption,
        });
      else
        console.warn(`Photo ${id} not found in Product ${prodId}`);
    }

    return photos.sort((a, b) => a.Id - b.Id);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Lexical(id: number): Promise<string> {
    // await this.EnsureConnected();
    // return JSON.stringify(demo.editorState);
    return "This is a demo";
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static ComboList(prodId: number): Promise<{
    ComboId: number;
    Stock: number;
    Types: number[];
  }[]> {
    return this.WithTimeCache(prodId, "ProductGetComboList", dayjs().add(1, "m"), prodId);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static PhotoList(prodId: number): Promise<number[]> {
    return this.WithTimeCache(prodId, "ProductGetPhotoList", dayjs().add(1, "m"), prodId);
  }
}
