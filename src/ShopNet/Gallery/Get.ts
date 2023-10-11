import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class GalleryGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static async Categories(): Promise<string[]> {
    await this.EnsureConnected();
    const res = await this.Hub.invoke<string[]>("Categories");
    return res;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  public static async Products(category: string): Promise<[number[], number]> {
    await this.EnsureConnected();
    const nums = await this.Hub.invoke<number[]>("Products", category);

    return [
      nums,
      4 - (nums.length % 4)
    ];
  }
}
