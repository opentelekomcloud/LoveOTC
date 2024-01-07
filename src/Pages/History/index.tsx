import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Logger } from "~/Helpers/Logger";
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

const log = new Logger("History");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
function History() {
  const { data } = useRequest(() => Hub.Order.Get.List(log), {
    onError: log.error
  });

  return (
    <DelegateDataGrid Items={data || []} Columns={useConst(() => HistoryColumns(log))} />
  )
}

/** @deprecated */
export default History;
