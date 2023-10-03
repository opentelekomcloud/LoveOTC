import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { IHistoryItem } from "~/Pages/History";
import { HistoryColumns } from "~/Pages/History/Columns";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminOrderEdit } from "./Edit";

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
const columns: TableColumnDefinition<IHistoryItem>[] = [
  ...HistoryColumns.slice(0, -1),
  createTableColumn<IHistoryItem>({
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
          <AdminOrderEdit OrderId={item.Id} />
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
  const { data } = useRequest(AdminHub.Order.Get.List);

  return (
    <DelegateDataGrid Items={data || []} Columns={columns} />
  )
}
