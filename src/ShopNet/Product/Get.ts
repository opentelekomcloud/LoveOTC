import dayjs from "dayjs";
import { IComboItem } from "~/Pages/Admin/Product/Combo";
import { IPhotoItem } from "~/Pages/Admin/Product/Photo";
import { IProductInfo } from "~/Pages/Gallery";
import { Shared } from "../Database";
import { ShopNet } from "../ShopNet";
import { ProductEntity } from "./Entity";
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
   * @version 1.0.0
   */
  public static async Basic(prodId: number): Promise<IProductInfo> {
    const res = await ProductEntity.Product(prodId);
    if (!res)
      throw new Error(`Product ${prodId} Not Found`);

    const list = await this.#ProductGetPhotoList(prodId);

    for (const i of list) {
      const p = await ProductEntity.Photo(i);

      if (p && p.Cover)
        return {
          Name: res.Name,
          Cover: p.ObjectId,
        };
    }

    if (list.length > 0) {
      const p = await ProductEntity.Photo(list[0]);

      if (p)
        return {
          Name: res.Name,
          Cover: p.ObjectId,
        };
    }

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
   * @version 1.0.0
   */
  public static async Carousel(prodId: number): Promise<IPhotoItem[]> {
    const list = await this.#ProductGetPhotoList(prodId);
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
  static async #ProductGetPhotoList(prodId: number): Promise<number[]> {
    const res = await Shared.GetOrSet(
      `PhotoList_${prodId}`,
      async () => {
        await this.EnsureConnected();
        const db = await this.Hub.invoke<number[]>("ProductGetPhotoList", prodId);
        return db;
      },
      dayjs().add(1, "m")
    );

    return res;
  }
}
