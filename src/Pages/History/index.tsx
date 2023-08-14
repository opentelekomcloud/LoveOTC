import { Body1Strong, Button, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, Image, TableColumnDefinition, createTableColumn, tokens } from "@fluentui/react-components";
import { BoxArrowLeftRegular } from "@fluentui/react-icons";
import { ICartItem } from "~/Components/ShopCart";
import { Cover } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface IHistoryItem extends ICartItem {
  Status: string,
  TrackNumber: string,
  OrderDate: Date
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IHistoryItem>[] = [
  createTableColumn<IHistoryItem>({
    columnId: "Cover",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "unset", flexGrow: "unset" }}>
          <div style={{ width: "50px" }} />
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "unset", flexGrow: "unset" }}>
          <Image
            shape="square"
            style={{
              ...Cover,
              aspectRatio: "1",
              width: "50px",
              marginTop: tokens.spacingVerticalXS,
              marginBottom: tokens.spacingVerticalXS,
            }}
            src={item.Image}
          />
        </DataGridCell>
      )
    },
  }),
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
        <DataGridHeaderCell style={{ flexBasis: "unset", flexGrow: "unset" }}>
          Refund
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "unset", flexGrow: "unset" }}>
          <Button
            appearance="subtle"
            icon={<BoxArrowLeftRegular />}
            style={{
              minWidth: "44px"
            }}
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
    <div>
      <DataGrid
        items={items}
        columns={columns}
        getRowId={(item: ICartItem) => item.Id}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => renderHeaderCell()}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<ICartItem>>
          {({ item, rowId }) => (
            <DataGridRow<ICartItem> key={rowId}>
              {({ renderCell }) => renderCell(item)}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  )
}
