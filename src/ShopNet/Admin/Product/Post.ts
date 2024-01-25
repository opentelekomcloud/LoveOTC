import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { Subject } from "rxjs";
import { Logger } from "~/Helpers/Logger";
import { CurrentEditor } from "~/Lexical/Utils";
import { ProductGet } from "~/ShopNet/Product/Get";
import { AdminNet } from "../AdminNet";
import { AdminProductGet } from "./Get";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class AdminProductPost extends AdminNet {
  /** "Product", "Post" */
  protected static override readonly Log = [...super.Log, "Product", "Post"];

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.4.0
   */
  public static useCreate(options: Options<number, [string]>) {
    return useRequest(async name => {
      const res = await this.Invoke<number>("ProductPostCreate", name);
      AdminProductGet.ListUpdate(x => [res, ...x])
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useMovePhoto(options: Options<true, [number, boolean]>) {
    return useRequest(async (photoId, up) => {
      const res = await this.Invoke<boolean>("ProductPostMovePhoto", photoId, up);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.5
   */
  public static usePhoto(pLog: Logger, options: Options<number, [number, File]>) {
    const log = useConst(() => pLog.With(...this.Log, "Photo"));

    return useRequest(async (prodId, file) => {
      if (!file.type.startsWith("image/"))
        throw new TypeError("File is not an image");

      if (file.size > 10 * 1024 * 1024)
        throw new RangeError("File is too large, max 10MB");

      const subject = new Subject<Uint8Array>();
      const res = this.Invoke<number>("ProductPostPhoto", prodId, subject);
      await this.HandleFileStream(file, subject, log);

      const id = await res;
      ProductGet.PhotoListUpdate(prodId, x => [...x, id]);

      return id;
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

  /**
   * @author Aloento
   * @since 1.2.0
   * @version 0.1.0
   */
  public static useLexical(options: Options<true, [number]>) {
    return useRequest(async prodId => {
      const state = CurrentEditor?.getEditorState();
      let json: string | undefined;

      if (state && !state.isEmpty())
        json = JSON.stringify(state.toJSON());

      const res = await this.Invoke<true>("ProductPostDescription", prodId, json);
      this.EnsureTrue(res);
      return res;
    }, options);
  }
}
