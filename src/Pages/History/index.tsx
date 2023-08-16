import { Body1Strong, Button, DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { BoxArrowLeftRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { ICartItem } from "~/Components/ShopCart";
import { CoverCol } from "~/Helpers/CoverCol";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface IHistoryItem extends ICartItem {
  Status: string,
  TrackNumber: string,
  OrderDate: Date
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export const HistoryColumns: TableColumnDefinition<IHistoryItem>[] = [
  CoverCol,
  createTableColumn<IHistoryItem>({
    columnId: "Product",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Product</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          <Body1Strong>{item.Name}</Body1Strong>
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          <Body1Strong>{item.Type}</Body1Strong>
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "OrderId",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Order Id</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          {item.Id}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "Quantity",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Quantity</DataGridHeaderCell>;
    },
    renderCell(item) {
      return <DataGridCell>{item.Quantity}</DataGridCell>
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
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "2.5%", flexGrow: "unset" }}>
          Refund
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "2.5%", flexGrow: "unset", justifyContent: "center" }}>
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
    Image: "https://picsum.photos/550",
    Name: "OTC SHIRT - GREY",
    Type: "Short Sleeve, S",
    Quantity: 1,
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  },
  {
    Id: 2,
    Image: "https://picsum.photos/600",
    Name: "OTC Cap - Cap and Cap",
    Type: "Red, Long and Long",
    Quantity: 1,
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  }
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
