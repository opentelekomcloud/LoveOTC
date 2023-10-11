import { useRequest } from "ahooks";
import { useMemo } from "react";
import { useShopCart } from "~/Components/ShopCart/Context";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function useLimit(prodId: number): [boolean, number] {
  const { List } = useShopCart();
  const { data } = useRequest(Hub.Product.Get.Limit.bind(Hub.Product.Get), {
    defaultParams: [prodId]
  })

  const limit = data || 3;

  return useMemo(() => {
    let count = 0;

    for (const i of List) {
      if (i.ProdId === prodId)
        count += i.Quantity;

      if (count >= limit)
        return [true, limit];
    }

    return [false, limit];
  }, [List]);
}
