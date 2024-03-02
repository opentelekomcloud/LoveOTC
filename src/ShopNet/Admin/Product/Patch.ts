import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { Subject } from "rxjs";
import { Logger } from "~/Helpers/Logger";
import { ObjectStorage } from "~/ShopNet/ObjectStorage";
import { ProductData } from "~/ShopNet/Product/Data";
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
    }, {
      ...options,
      manual: true
    });
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
    }, {
      ...options,
      manual: true
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.1.0
   */
  public static usePhoto(photoId: number, pLog: Logger, options: Options<true, [File]>) {
    const log = useConst(() => pLog.With(...this.Log, "Photo"));

    const { data } = ProductData.usePhoto(photoId, {
      onError: log.error
    });

    const { mutate } = ObjectStorage.useGet(data!.ObjectId, pLog);

    return useRequest(async (file) => {
      if (!file.type.startsWith("image/"))
        throw new TypeError("File is not an image");

      if (file.size > 10 * 1024 * 1024)
        throw new RangeError("File is too large, max 10MB");

      await this.EnsureConnected();

      const subject = new Subject<Uint8Array>();
      const res = this.Hub.invoke<boolean>("ProductPatchPhoto", photoId, subject);
      await this.HandleFileStream(file, subject, log);

      this.EnsureTrue(await res);

      const mut = await file.arrayBuffer();
      mutate(() => [new Uint8Array(mut)]);

      return true as const;
    }, {
      ...options,
      manual: true
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 1.0.0
   */
  public static useCaption(photoId: number, options: Options<true, [string]>) {
    const { mutate } = ProductData.usePhoto(photoId);

    return useRequest(async (caption) => {
      const res = await this.Invoke<boolean>("ProductPatchCaption", photoId, caption);
      this.EnsureTrue(res);

      mutate((raw) => {
        raw!.Caption = caption;
        return raw;
      });

      return res;
    }, {
      ...options,
      manual: true
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.3.0
   */
  public static useVariantName(variantId: number, options: Options<true, [string]>) {
    const { mutate } = ProductData.useVariant(variantId);

    return useRequest(async (name) => {
      const res = await this.Invoke<boolean>("ProductPatchVariantName", variantId, name);
      this.EnsureTrue(res);

      mutate((raw) => {
        raw!.Name = name;
        return raw;
      });

      return res;
    }, {
      ...options,
      manual: true
    });
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.3.0
   */
  public static useType(typeId: number, options: Options<true, [string]>) {
    const { mutate } = ProductData.useType(typeId);

    return useRequest(async (newName) => {
      const res = await this.Invoke<boolean>("ProductPatchType", typeId, newName);
      this.EnsureTrue(res);

      mutate((raw) => {
        raw!.Name = newName;
        return raw;
      });

      return res;
    }, {
      ...options,
      manual: true
    });
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
    }, {
      ...options,
      manual: true
    });
  }
}
