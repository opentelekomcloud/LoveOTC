import { useRequest } from "ahooks";
import { useShopCart } from "~/Components/ShopCart/Context";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function useLimit(prodId: number): [boolean, number] {
  const { List } = useShopCart();
  const { data } = useRequest(() => Hub.Product.Get.Limit(prodId));

  const limit = data || 3;
  let count = 0;

  for (const i of List) {
    if (i.ProdId === prodId)
      count += i.Quantity;

    if (count >= limit)
      return [true, limit];
  }

  return [false, limit];
}
