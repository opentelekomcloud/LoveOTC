import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class AdminProductDelete extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static usePhoto(options: Options<true, [number]>) {
    return useRequest((photoId) => this.Invoke("ProductDeletePhoto", photoId), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useVariant(options: Options<true, [number]>) {
    return useRequest((variantId) => this.Invoke("ProductDeleteVariant", variantId), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useType(options: Options<true, [number, string]>) {
    return useRequest((variantId, type) => this.Invoke("ProductDeleteType", variantId, type), options);
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static useCombo(options: Options<true, [number]>) {
    return useRequest((comboId) => this.Invoke("ProductDeleteCombo", comboId), options);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.0
   */
  public static useProduct(options: Options<true, [number]>) {
    return useRequest((prodId) => this.Invoke("ProductDeleteProduct", prodId), options);
  }
}
