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
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Category(prodId: number, name: string): Promise<true> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Photo(photoId: number, file: File): Promise<true> {
    if (!file.type.startsWith("image/"))
      throw new TypeError("File is not an image");

    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Caption(photoId: number, caption: string): Promise<true> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async VariantName(variantId: number, name: string): Promise<true> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Type(variantId: number, oldName: string, newName: string): Promise<true> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Combo(comboId: number, combo: Record<string, string>, stock: number): Promise<true> {
    throw new Error("TODO");
  }
}
