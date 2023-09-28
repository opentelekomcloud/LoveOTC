import { random } from "lodash-es";
import { ProductInfo } from "~/Pages/Gallery";
import { IProduct } from "~/Pages/Product";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class ProductGet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Basic(id: number): Promise<ProductInfo> {
    return {
      Cover: `https://picsum.photos/${random(500, 1000)}`,
      Name: `Product ${id}`
    }
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Limit(id: number): Promise<number> {
    return 3;
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Detail(id: number): Promise<IProduct> {
    if (id > 100) throw null;

    return {
      Name: "OTC SHIRT - GREY",
      Combos: [
        {
          Combo: [
            {
              Variant: "Sleeve",
              Type: "Short"
            },
            {
              Variant: "Size",
              Type: "S"
            }
          ],
          Stock: 8
        },
        {
          Combo: [
            {
              Variant: "Sleeve",
              Type: "Short"
            },
            {
              Variant: "Size",
              Type: "L"
            }
          ],
          Stock: 6
        },
        {
          Combo: [
            {
              Variant: "Sleeve",
              Type: "Long"
            },
            {
              Variant: "Size",
              Type: "S"
            }
          ],
          Stock: 10
        },
        {
          Combo: [
            {
              Variant: "Sleeve",
              Type: "Long"
            },
            {
              Variant: "Size",
              Type: "L"
            }
          ],
          Stock: 4
        },
      ]
    }
  }

  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Carousel(id: number): Promise<string[]> {
    return Array(random(3, 8)).fill(0)
      .map(() => `https://picsum.photos/${random(500, 1000)}`)
  }
}
