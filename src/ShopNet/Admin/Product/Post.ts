import { Subject } from "rxjs";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminProductPost extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Create(name: string): Promise<number> {
    const res = await this.Invoke<number>("ProductPostCreate", name);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async MovePhoto(photoId: number, up: boolean): Promise<true> {
    const res = await this.Invoke<true>("ProductPostMovePhoto", photoId, up);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.1
   */
  public static async Photo(prodId: number, file: File): Promise<true> {
    if (!file.type.startsWith("image/"))
      throw new TypeError("File is not an image");

    if (file.size > 10 * 1024 * 1024)
      throw new RangeError("File is too large, max 10MB");

    const subject = new Subject<Uint8Array>();
    const res = this.Invoke<true>("ProductPostPhoto", prodId, subject);
    await this.HandleFileStream(file, subject);

    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Variant(prodId: number, name: string): Promise<number> {
    const res = await this.Invoke<number>("ProductPostVariant", prodId, name);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Type(variantId: number, name: string): Promise<number> {
    const res = await this.Invoke<number>("ProductPostType", variantId, name);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Combo(prodId: number, combo: Record<string, string>, stock: number): Promise<number> {
    const res = await this.Invoke<number>("ProductPostCombo", prodId, combo, stock);
    return res;
  }
}
