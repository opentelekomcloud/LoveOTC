import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { Subject } from "rxjs";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class AdminProductPost extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCreate(options: Options<number, [string]>) {
    return useRequest((name) => this.Invoke("ProductPostCreate", name), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useMovePhoto(options: Options<true, [number, boolean]>) {
    return useRequest((photoId, up) => this.Invoke("ProductPostMovePhoto", photoId, up), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.2
   */
  public static usePhoto(options: Options<true, [number, File]>) {
    return useRequest(async (prodId, file) => {
      if (!file.type.startsWith("image/"))
        throw new TypeError("File is not an image");

      if (file.size > 10 * 1024 * 1024)
        throw new RangeError("File is too large, max 10MB");

      const subject = new Subject<Uint8Array>();
      const res = this.Invoke<true>("ProductPostPhoto", prodId, subject);
      await this.HandleFileStream(file, subject);

      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useVariant(options: Options<number, [number, string]>) {
    return useRequest((prodId, name) => this.Invoke("ProductPostVariant", prodId, name), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useType(options: Options<number, [number, string]>) {
    return useRequest((variantId, name) => this.Invoke("ProductPostType", variantId, name), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCombo(options: Options<number, [number, Record<string, string>, number]>) {
    return useRequest((prodId, combo, stock) => this.Invoke("ProductPostCombo", prodId, combo, stock), options);
  }
}
