import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { ICartItem } from "~/Components/ShopCart";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  ten: {
    flexBasis: "10%",
    flexGrow: 0
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
const columns: TableColumnDefinition<ICartItem>[] = [
  createTableColumn<ICartItem>({
    columnId: "Product",
    renderHeaderCell() {
      return <DataGridHeaderCell>Name</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Name}</DataGridCell>
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Type",
    renderHeaderCell() {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{Object.entries(item.Type).reduce((prev, curr) => `${prev} ${curr[0]} : ${curr[1]} ;`, "")}</DataGridCell>
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Quantity",
    renderHeaderCell() {
      return (
        <DataGridHeaderCell className={useStyles().ten}>
          Quantity
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().ten}>
          {item.Quantity}
        </DataGridCell>
      )
    }
  }),
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminOrderList({ Items }: { Items?: ICartItem[] }) {
  return (
    <DelegateDataGrid Items={Items} Columns={columns} />
  )
}
