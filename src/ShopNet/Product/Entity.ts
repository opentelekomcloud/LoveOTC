import { Dynamic, IConcurrency, Shared } from "../Database";
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
 * @since 0.5.0
 * @version 0.1.0
 */
export class ProductEntity extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static async Product(key: number): Promise<DynamicProduct | void> {
    const index = `Product_${key}`;
    const prod = await Shared.Get<DynamicProduct>(index);

    await this.EnsureConnected();
    const res = await this.Hub.invoke<Dynamic<DynamicProduct>>("ProductEntity", key, prod?.Version);

    if (res === true)
      return prod!;

    if (res === null)
      return Shared.Sto.delete(index);

    Shared.Set(index, res);
    return res;
  }
}
