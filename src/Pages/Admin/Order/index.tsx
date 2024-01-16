import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { Logger } from "~/Helpers/Logger";
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
  },
  ten: {
    flexBasis: "10%",
    flexGrow: 0
  },
});

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export interface IAdminOrderItem extends IOrderItem {
  User: string;
}

const log = new Logger("Admin", "Order");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
const columns: TableColumnDefinition<IAdminOrderItem>[] = [
  ...HistoryColumns(log).slice(0, -1),
  createTableColumn<IAdminOrderItem>({
    columnId: "User",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().ten}>
          User
        </DataGridHeaderCell>
      );
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().ten}>
          {item.User}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IAdminOrderItem>({
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
  const { data } = useRequest(() => AdminHub.Order.Get.List(log), {
    onError: log.error
  });

  return (
    <DelegateDataGrid Items={data} Columns={columns} />
  )
}
