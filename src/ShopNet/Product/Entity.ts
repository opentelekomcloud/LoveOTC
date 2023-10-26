import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
interface IDynamicProduct extends IConcurrency {
  Name: string;
  CategoryId?: number;
  Description?: object;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
interface IDynamicPhoto extends IConcurrency {
  Cover?: boolean;
  Caption?: string;
  Order: number;
  ObjectId: string;
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
  public static Product(key: number): Promise<IDynamicProduct | void> {
    return this.WithVersionCache(key, "ProductEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Photo(key: number): Promise<IDynamicPhoto | void> {
    return this.WithVersionCache(key, "PhotoEntity");
  }
}
