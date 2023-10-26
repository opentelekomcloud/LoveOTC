import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

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
  public static Product(key: number): Promise<({
    Name: string;
    CategoryId?: number;
    Description?: object;
  } & IConcurrency) | void> {
    return this.WithVersionCache(key, "ProductEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Photo(key: number): Promise<({
    Cover?: boolean;
    Caption?: string;
    Order: number;
    ObjectId: string;
  } & IConcurrency) | void> {
    return this.WithVersionCache(key, "PhotoEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Type(key: number): Promise<({
    Name: string;
    VariantId: number;
  } & IConcurrency) | void> {
    return this.WithVersionCache(key, "TypeEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static Variant(key: number): Promise<({
    Name: string;
  } & IConcurrency) | void> {
    return this.WithVersionCache(key, "VariantEntity");
  }
}
