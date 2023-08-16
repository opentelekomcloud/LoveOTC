import { Button, DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { OpenRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { HistoryColumns, IHistoryItem } from "~/Pages/History";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IHistoryItem>[] = [
  ...HistoryColumns.slice(0, -1),
  createTableColumn<IHistoryItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "2.5%", flexGrow: "unset" }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "2.5%", flexGrow: "unset", justifyContent: "center" }}>
          <Button
            appearance="subtle"
            icon={<OpenRegular />}
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
export function AdminOrder() {
  return (
    <DelegateDataGrid Items={items} Columns={columns} />
  )
}
