import { Button, DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { AddRegular, DeleteRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Flex } from "~/Helpers/Styles";
import { AdminProductVariantEdit } from "./Edit";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IVariantItem {
  Id: string;
  Types: string[];
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IVariantItem>[] = [
  createTableColumn<IVariantItem>({
    columnId: "Name",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "12%", flexGrow: 0 }}>
          Name
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "12%", flexGrow: 0 }}>
          {item.Id}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IVariantItem>({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          {
            item.Types.reduce((prev, curr) => {
              return `${prev} ${curr} ;`
            }, "")
          }
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IVariantItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "7%", flexGrow: 0 }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "7%", flexGrow: 0 }}>
          <AdminProductVariantEdit />

          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
          />
        </DataGridCell>
      )
    }
  })
]

const items: IVariantItem[] = [
  {
    Id: "Color",
    Types: ["White", "Red"]
  },
  {
    Id: "Size",
    Types: ["Big", "Small"]
  }
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductVariant() {
  return (
    <div>
      <div style={{
        ...Flex,
        justifyContent: "space-between"
      }}>
        <Subtitle1>Variant</Subtitle1>
        <Button appearance="primary" icon={<AddRegular />}>New Variant</Button>
      </div>

      <DelegateDataGrid Items={items} Columns={columns} />
    </div>
  )
}
