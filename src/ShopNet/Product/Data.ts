import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class ProductData extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Product(key: number): Promise<{
    Name: string;
    Category?: string;
  } & IConcurrency> {
    return this.GetVersionCache(key, "ProductEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Lexical(key: number): Promise<{
    Description?: string;
  } & IConcurrency> {
    return this.GetVersionCache(key, "LexicalEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Photo(key: number): Promise<{
    Cover?: boolean;
    Caption?: string;
    Order: number;
    ObjectId: string;
  } & IConcurrency> {
    return this.GetVersionCache(key, "PhotoEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Type(key: number): Promise<{
    Name: string;
    VariantId: number;
  } & IConcurrency> {
    return this.GetVersionCache(key, "TypeEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Variant(key: number): Promise<{
    Name: string;
    ProductId: number;
  } & IConcurrency> {
    return this.GetVersionCache(key, "VariantEntity");
  }
}
