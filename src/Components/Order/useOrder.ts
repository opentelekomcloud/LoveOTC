import { useConst } from "@fluentui/react-hooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { useSWR } from "~/Helpers/useSWR";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { OrderEntity } from "~/ShopNet/Order/Entity";
import { SignalR } from "~/ShopNet/SignalR";

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
export function useOrder(orderId: number, admin?: true, options?: Options<OrderEntity.Order, []>) {
  const index = useConst(() => SignalR.Index(orderId, Hub.Order.Get.order));

  return useSWR(
    index,
    () => (admin ? AdminHub : Hub).Order.Get.Order(orderId),
    {
      ...options,
      useMemory: true
    }
  );
}
