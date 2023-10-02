import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { OrderDetail } from "./Detail";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.1
 */
export interface IHistoryItem {
  Id: number;
  Orders: string[];
  Quantity: number;
  Status: string,
  TrackNumber: string,
  OrderDate: Date
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.1
 */
export const HistoryColumns: TableColumnDefinition<IHistoryItem>[] = [
  createTableColumn<IHistoryItem>({
    columnId: "OrderId",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "5%", flexGrow: 0 }}>
          Order Id
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "5%", flexGrow: 0 }}>
          {item.Id}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "Products",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Products</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          {item.Orders[0]} {item.Orders.length > 1 && `& +${item.Orders.length - 1}`}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "Quantity",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "4%", flexGrow: 0 }}>
          Quantity
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "4%", flexGrow: 0 }}>
          {item.Quantity}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "OrderDate",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Order Date</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridHeaderCell>{item.OrderDate.toDateString()}</DataGridHeaderCell>
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "TrackNumber",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Track Number</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.TrackNumber}</DataGridCell>
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "Status",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Order State</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Status}</DataGridCell>
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "Detail",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "2.5%", flexGrow: 0 }}>
          Detail
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "2.5%", flexGrow: 0, justifyContent: "center" }}>
          <OrderDetail />
        </DataGridCell>
      )
    },
  })
]

const items: IHistoryItem[] = [
  {
    Id: 1,
    Orders: ["OTC SHIRT - GREY", "OTC Cap - Cap and Cap"],
    Quantity: 2,
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  },
  {
    Id: 2,
    Orders: ["OTC Cap - Cap and Cap"],
    Quantity: 1,
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  },
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function History() {
  return (
    <DelegateDataGrid Items={items} Columns={HistoryColumns} />
  )
}
