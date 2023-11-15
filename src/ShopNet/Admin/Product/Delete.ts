import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminProductDelete extends AdminNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Photo(photoId: number): Promise<true> {
    const res = await this.Invoke<true>("ProductDeletePhoto", photoId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Variant(variantId: number): Promise<true> {
    const res = await this.Invoke<true>("ProductDeleteVariant", variantId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Type(variantId: number, type: string): Promise<true> {
    const res = await this.Invoke<true>("ProductDeleteType", variantId, type);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Combo(comboId: number): Promise<true> {
    const res = await this.Invoke<true>("ProductDeleteCombo", comboId);
    return res;
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static async Product(prodId: number): Promise<true> {
    const res = await this.Invoke<true>("ProductDeleteProduct", prodId);
    return res;
  }
}
