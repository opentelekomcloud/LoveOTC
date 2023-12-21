import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { Subject } from "rxjs";
import { Logger } from "~/Helpers/Logger";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export abstract class AdminProductPatch extends AdminNet {
  /** "Product", "Patch" */
  protected static override readonly Log = [...super.Log, "Product", "Patch"];

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useName(options: Options<true, [number, string]>) {
    return useRequest(async (prodId, name) => {
      const res = await this.Invoke<boolean>("ProductPatchName", prodId, name);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCategory(options: Options<true, [number, string]>) {
    return useRequest(async (prodId, name) => {
      const res = await this.Invoke<boolean>("ProductPatchCategory", prodId, name);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.2
   */
  public static usePhoto(pLog: Logger, options: Options<true, [number, File]>) {
    const log = useConst(() => pLog.With(...this.Log, "Photo"));

    return useRequest(async (photoId, file) => {
      if (!file.type.startsWith("image/"))
        throw new TypeError("File is not an image");

      if (file.size > 10 * 1024 * 1024)
        throw new RangeError("File is too large, max 10MB");

      await this.EnsureConnected();

      const subject = new Subject<Uint8Array>();
      const res = this.Hub.invoke<boolean>("ProductPatchPhoto", photoId, subject);
      await this.HandleFileStream(file, subject, log);

      this.EnsureTrue(await res);
      return true as const;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCaption(options: Options<true, [number, string]>) {
    return useRequest(async (photoId, caption) => {
      const res = await this.Invoke<boolean>("ProductPatchCaption", photoId, caption);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useVariantName(options: Options<true, [number, string]>) {
    return useRequest(async (variantId, name) => {
      const res = await this.Invoke<boolean>("ProductPatchVariantName", variantId, name);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useType(options: Options<true, [number, string, string]>) {
    return useRequest(async (variantId, oldName, newName) => {
      const res = await this.Invoke<boolean>("ProductPatchType", variantId, oldName, newName);
      this.EnsureTrue(res);
      return res;
    }, options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCombo(options: Options<true, [number, Record<string, string>, number]>) {
    return useRequest(async (comboId, combo, stock) => {
      const res = await this.Invoke<boolean>("ProductPatchCombo", comboId, combo, stock);
      this.EnsureTrue(res);
      return res;
    }, options);
  }
}
