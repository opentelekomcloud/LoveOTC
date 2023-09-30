import { random } from "lodash-es";
import { ICartItem } from "~/Components/ShopCart";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface INew {
  ShopCart: ICartItem[];
  Comment?: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class OrderPost {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async New(req: INew): Promise<number> {
    return random(1, 100);
  }
}
