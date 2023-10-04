import { IProductItem } from "~/Pages/Admin/Product";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class AdminProductGet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async List(): Promise<IProductItem[]> {
    return [
      {
        Id: 1,
        Cover: "https://picsum.photos/550",
        Name: "OTC SHIRT - GREY",
        Category: "Clothes",
        Variant: 2,
        Type: 4,
        Stock: 10,
      },
      {
        Id: 2,
        Cover: "https://picsum.photos/600",
        Name: "OTC Cap - Cap and Cap",
        Category: "Hat",
        Variant: 2,
        Type: 4,
        Stock: 20,
      }
    ];
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Name(prodId: number): Promise<string> {
    return "OTC SHIRT - GREY";
  }
}
