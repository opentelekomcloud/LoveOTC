import { Button, DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { BoxArrowLeftRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { IType } from "../Admin/Product/Combo";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export interface IHistoryItem {
  Id: number;
  Orders: IOrder[];
  Status: string,
  TrackNumber: string,
  OrderDate: Date
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IOrder {
  Name: string;
  Type: IType[];
  Quantity: number;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
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
          {item.Orders[0].Name} {item.Orders.length > 1 && `& +${item.Orders.length - 1}`}
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
          {item.Orders.map(val => val.Quantity).reduce((prev, curr) => prev + curr, 0)}
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
    columnId: "Cancel",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "2.5%", flexGrow: 0 }}>
          Cancel
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "2.5%", flexGrow: 0, justifyContent: "center" }}>
          <Button
            appearance="subtle"
            icon={<BoxArrowLeftRegular />}
          />
        </DataGridCell>
      )
    },
  })
]

const items: IHistoryItem[] = [
  {
    Id: 1,
    Orders: [
      {
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
      },
      {
        Name: "OTC Cap - Cap and Cap",
        Type: [
          {
            Variant: "Color",
            Type: "Red"
          },
          {
            Variant: "Size",
            Type: "Long and Long"
          }
        ],
        Quantity: 1
      }
    ],
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  },
  {
    Id: 2,
    Orders: [
      {
        Name: "OTC Cap - Cap and Cap",
        Type: [
          {
            Variant: "Color",
            Type: "Red"
          },
          {
            Variant: "Size",
            Type: "Long and Long"
          }
        ],
        Quantity: 1
      }
    ],
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
