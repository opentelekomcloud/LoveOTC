import dayjs from "dayjs";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class GalleryGet extends ShopNet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.1
   */
  public static Categories(): Promise<string[]> {
    return this.WithTimeCache("", "GalleryGetCategories", dayjs().add(1, "m"));
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.1
   */
  public static async Products(category: string): Promise<[number[], number]> {
    const nums = await this.WithTimeCache<number[]>(category, "GalleryGetProducts", dayjs().add(1, "m"), category);

    return [
      nums,
      4 - (nums.length % 4)
    ];
  }
}
