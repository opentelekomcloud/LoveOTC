import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
interface DynamicProduct extends IConcurrency {
  Name: string;
  CategoryId?: number;
  Description?: object;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
interface DynamicPhoto extends IConcurrency {
  Cover?: boolean;
  Caption?: string;
  Order: number;
  ObjectId: string;
  ProductId: number;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class ProductEntity extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Product(key: number): Promise<DynamicProduct | void> {
    return this.WithVersionCache(key, "ProductEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Photo(key: number): Promise<DynamicPhoto | void> {
    return this.WithVersionCache(key, "PhotoEntity");
  }
}
