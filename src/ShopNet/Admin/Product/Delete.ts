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
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductDeletePhoto", photoId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Variant(variantId: number): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductDeleteVariant", variantId);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Type(variantId: number, type: string): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductDeleteType", variantId, type);
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Combo(comboId: number): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductDeleteCombo", comboId);
    return res;
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static async Product(prodId: number): Promise<true> {
    await this.EnsureAdmin();
    const res = await this.Hub.invoke<true>("ProductDeleteProduct", prodId);
    return res;
  }
}
