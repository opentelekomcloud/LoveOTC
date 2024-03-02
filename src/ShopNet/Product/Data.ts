import { useConst } from "@fluentui/react-hooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { useSWR } from "~/Helpers/useSWR";
import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

export namespace ProductData {
  export type Product = {
    Name: string;
    Category?: string;
  } & IConcurrency;

  export type Lexical = {
    Description?: string;
  } & IConcurrency;

  export type Photo = {
    PhotoId: number;
    Caption?: string;
    Order: number;
    ObjectId: string;
    ProductId: number;
  } & IConcurrency;

  export type Type = {
    Name: string;
    VariantId: number;
  } & IConcurrency;

  export type Variant = {
    Name: string;
    ProductId: number;
  } & IConcurrency;

  export type Combo = {
    Stock: number;
    Types: number[];
  } & IConcurrency;
}

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
  public static readonly product = "ProductEntity";
  public static Product(key: number): Promise<ProductData.Product> {
    return this.GetVersionCache(key, this.product);
  }
  /** @deprecated */
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
  public static readonly photo = "PhotoEntity";
  public static Photo(key: number): Promise<ProductData.Photo> {
    return this.GetVersionCache(key, this.photo);
  }

  /**
   * @author Aloento
   * @since 1.4.0
   * @version 0.1.0
   */
  public static usePhoto(key: number, options?: Options<ProductData.Photo, number[]>) {
    const index = useConst(() => this.Index(key, this.photo));

    const req = useSWR(
      index,
      (id) => this.Photo(id),
      {
        ...options,
        defaultParams: [key],
      }
    );

    return req;
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

  /**
   * @author Aloento
   * @since 1.3.5
   * @version 0.1.0
   * @liveSafe
   */
  public static Combo(key: number): Promise<ProductData.Combo> {
    return this.GetVersionCache(key, "ComboEntity");
  }
}
