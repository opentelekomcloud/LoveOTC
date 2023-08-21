import { Button, DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { OpenRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { HistoryColumns, IHistoryItem } from "~/Pages/History";
import { AdminOrderEdit } from "./Edit";

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
        <DataGridHeaderCell style={{ flexBasis: "2.5%", flexGrow: 0 }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      const [open, { toggle }] = useBoolean();

      return (
        <DataGridCell style={{ flexBasis: "2.5%", flexGrow: 0, justifyContent: "center" }}>
          <Button
            appearance="subtle"
            icon={<OpenRegular />}
            onClick={toggle}
          />

          <AdminOrderEdit Open={open} Toggle={toggle} />
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
export function AdminOrder() {
  return (
    <DelegateDataGrid Items={items} Columns={columns} />
  )
}
