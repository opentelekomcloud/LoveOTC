/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminProductPost {
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
  public static async Create(name: string): Promise<number> {
    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async MovePhoto(photoId: number, up: boolean): Promise<true> {
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
  public static async UploadPhoto(photoId: number | null, file: File): Promise<true> {
    if (!file.type.startsWith("image/"))
      throw new TypeError("File is not an image");

    throw new Error("TODO");
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async NewVariant(prodId: number, name: string): Promise<true> {
    throw new Error("TODO");
  }
}
