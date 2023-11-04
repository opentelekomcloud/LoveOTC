import { Subject } from "rxjs";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminProductPatch extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Name(prodId: number, name: string): Promise<true> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<boolean>("ProductPatchName", prodId, name);
    this.EnsureTrue(res);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Category(prodId: number, name: string): Promise<true> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<boolean>("ProductPatchCategory", prodId, name);
    this.EnsureTrue(res);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Photo(photoId: number, file: File): Promise<true> {
    if (!file.type.startsWith("image/"))
      throw new TypeError("File is not an image");

    if (file.size > 10 * 1024 * 1024)
      throw new RangeError("File is too large, max 10MB");

    await this.EnsureConnected();

    const subject = new Subject<Uint8Array>();
    const res = this.Hub.invoke<boolean>("ProductPatchPhoto", photoId, subject);
    await this.HandleFileStream(file, subject);

    this.EnsureTrue(await res);
    return true;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Caption(photoId: number, caption: string): Promise<true> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<boolean>("ProductPatchCaption", photoId, caption);
    this.EnsureTrue(res);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async VariantName(variantId: number, name: string): Promise<true> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<boolean>("ProductPatchVariantName", variantId, name);
    this.EnsureTrue(res);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Type(variantId: number, oldName: string, newName: string): Promise<true> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<boolean>("ProductPatchType", variantId, oldName, newName);
    this.EnsureTrue(res);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Combo(comboId: number, combo: Record<string, string>, stock: number): Promise<true> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<boolean>("ProductPatchCombo", comboId, combo, stock);
    this.EnsureTrue(res);
    return res;
  }
}
