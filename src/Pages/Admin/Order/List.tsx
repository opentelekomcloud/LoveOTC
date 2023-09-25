import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { IOrder } from "~/Pages/History";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IOrderItem extends IOrder {
  Id: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IOrderItem>[] = [
  createTableColumn<IOrderItem>({
    columnId: "Product",
    renderHeaderCell() {
      return <DataGridHeaderCell>Name</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Name}</DataGridCell>
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Type",
    renderHeaderCell() {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Type.reduce((prev, curr) => `${prev} ${curr.Variant} : ${curr.Type} ;`, "")}</DataGridCell>
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Quantity",
    renderHeaderCell() {
      return (
        <DataGridHeaderCell style={{ flexBasis: "10%", flexGrow: 0 }}>
          Quantity
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "10%", flexGrow: 0 }}>
          {item.Quantity}
        </DataGridCell>
      )
    }
  }),
]

const items: IOrderItem[] = [
  {
    Id: 0,
    Name: "OTC Cap - Cap and Cap",
    Type: [
      {
        Variant: "Color",
        Type: "Red"
      },
      {
        Variant: "Size",
        Type: "S"
      }
    ],
    Quantity: 1
  },
  {
    Id: 1,
    Name: "OTC SHIRT - GREY",
    Type: [
      {
        Variant: "Color",
        Type: "Red"
      },
      {
        Variant: "Size",
        Type: "S"
      }
    ],
    Quantity: 1
  }
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminOrderList() {
  return (
    <DelegateDataGrid Items={items} Columns={columns} />
  )
}
