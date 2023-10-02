import { random } from "lodash-es";
import { createUID } from "~/Lexical/Utils/createUID";
import { INetOrder } from "./Post";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class OrderGet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Detail(id: number): Promise<INetOrder> {
    return {
      ShopCart: [
        {
          Id: 1,
          ProdId: random(1, 10),
          Cover: "https://picsum.photos/550",
          Name: "OTC SHIRT - GREY",
          Type: {
            Color: "White",
            Size: "S"
          },
          Quantity: 1
        },
        {
          Id: 2,
          ProdId: random(1, 10),
          Cover: "https://picsum.photos/600",
          Name: "OTC Cap - Cap and Cap",
          Type: {
            Color: "Red",
            Size: "Long and Long"
          },
          Quantity: 1
        }
      ],
      Comment: Array(10).fill(0).map(() => createUID()).reduce((prev, curr) => prev + curr, "")
    }
  }
}
