import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { IOrderItem } from "~/Pages/History";
import { HistoryColumns } from "~/Pages/History/Columns";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminOrderDetail } from "./Detail";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  two: {
    flexBasis: "2.5%",
    flexGrow: 0
  },
  twoc: {
    flexBasis: "2.5%",
    flexGrow: 0,
    justifyContent: "center"
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 */
const columns: TableColumnDefinition<IOrderItem>[] = [
  ...HistoryColumns.slice(0, -1),
  createTableColumn<IOrderItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().two}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().twoc}>
          <AdminOrderDetail OrderId={item.Id} />
        </DataGridCell>
      )
    },
  })
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export function AdminOrder() {
  const { data } = useRequest(AdminHub.Order.Get.List.bind(AdminHub.Order.Get));

  return (
    <DelegateDataGrid Items={data || []} Columns={columns} />
  )
}
