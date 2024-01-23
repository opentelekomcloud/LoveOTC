import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 1.3.0
 * @version 0.1.0
 */
export namespace ProductData {
  export type Product = {
    Name: string;
    Category?: string;
  } & IConcurrency;

  export type Lexical = {
    Description?: string;
  } & IConcurrency;

  export type Photo = {
    Cover?: boolean;
    Caption?: string;
    Order: number;
    ObjectId: string;
  } & IConcurrency;

  export type Type = {
    Name: string;
    VariantId: number;
  } & IConcurrency;

  export type Variant = {
    Name: string;
    ProductId: number;
  } & IConcurrency;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class ProductData extends ShopNet {
  public static readonly product = "ProductEntity";

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Product(key: number): Promise<ProductData.Product> {
    return this.GetVersionCache(key, this.product);
  }
  public static ProductUpdate(key: number, action: (raw: ProductData.Product) => ProductData.Product) {
    return this.UpdateCache(action, key, this.product);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Lexical(key: number): Promise<ProductData.Lexical> {
    return this.GetVersionCache(key, "LexicalEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Photo(key: number): Promise<ProductData.Photo> {
    return this.GetVersionCache(key, "PhotoEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Type(key: number): Promise<ProductData.Type> {
    return this.GetVersionCache(key, "TypeEntity");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   * @liveSafe
   */
  public static Variant(key: number): Promise<ProductData.Variant> {
    return this.GetVersionCache(key, "VariantEntity");
  }
}
