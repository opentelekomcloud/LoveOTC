import { IStreamResult } from "@microsoft/signalr";
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
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<number>("ProductPostCreate", name);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async MovePhoto(photoId: number, up: boolean): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductPostMovePhoto", photoId, up);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static async Photo(prodId: number, file: File): Promise<[number, IStreamResult<true>]> {
    if (!file.type.startsWith("image/"))
      throw new TypeError("File is not an image");

    if (file.size > 10 * 1024 * 1024)
      throw new RangeError("File is too large, max 10MB");

    await this.EnsureAdmin();

    const chunkSize = 30 * 1024;
    const chunks = Math.ceil(file.size / chunkSize);
    let index = 0;

    const subject = new Subject<Uint8Array>();
    const res = this.Hub.stream<true>("ProductPostPhoto", prodId, subject);

    while (index < chunks) {
      const start = index * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const reader = new FileReader();
      const buffer = await new Promise<Uint8Array>((resolve, reject) => {
        reader.onload = () => {
          resolve(new Uint8Array(reader.result as ArrayBuffer));
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsArrayBuffer(chunk);
      });

      subject.next(buffer);
      index++;
    }

    subject.complete();
    return [chunks, res];
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Variant(prodId: number, name: string): Promise<number> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<number>("ProductPostVariant", prodId, name);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Type(variantId: number, name: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductPostType", variantId, name);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Combo(prodId: number, combo: Record<string, string>, stock: number): Promise<number> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<number>("ProductPostCombo", prodId, combo, stock);
    return res;
  }
}
