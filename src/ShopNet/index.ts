import { Gallery } from "./Gallery";
import { ObjectStorage } from "./ObjectStorage";
import { Order } from "./Order";
import { Product } from "./Product";
import { User } from "./User";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export const Hub = {
  Gallery: Gallery,
  Product: Product,
  User: User,
  Order: Order,
  Storage: ObjectStorage
}
