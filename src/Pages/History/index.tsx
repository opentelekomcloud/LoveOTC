import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Hub } from "~/ShopNet";
import { HistoryColumns } from "./Columns";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.1
 */
export interface IOrderItem {
  Id: number;
  Items: string[];
  Quantity: number;
  Status: string,
  TrackNumber?: string,
  OrderDate: Date
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export function History() {
  const { data } = useRequest(Hub.Order.Get.List.bind(Hub.Order.Get));

  return (
    <DelegateDataGrid Items={data || []} Columns={HistoryColumns} />
  )
}
