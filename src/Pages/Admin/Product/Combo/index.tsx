import { Button, DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { AddRegular, DeleteRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { Flex } from "~/Helpers/Styles";
import { AdminProductComboEdit } from "./Edit";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IComboItem {
  Id: number;
  Combo: IType[];
  Stock: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IType {
  Variant: string;
  Type: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IComboItem>[] = [
  createTableColumn<IComboItem>({
    columnId: "Id",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "4%", flexGrow: 0 }}>
          Id
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "4%", flexGrow: 0 }}>
          {item.Id}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IComboItem>({
    columnId: "Combo",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Combo</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Combo.reduce((prev, curr) => `${prev} ${curr.Variant} : ${curr.Type} ;`, "")}</DataGridCell>
    }
  }),
  createTableColumn<IComboItem>({
    columnId: "Stock",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "5%", flexGrow: 0 }}>
          Stock
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "5%", flexGrow: 0 }}>
          {item.Stock}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IComboItem>({
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
          <AdminProductComboEdit />

          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
          />
        </DataGridCell>
      )
    }
  })
]

const items: IComboItem[] = [
  {
    Id: 0,
    Combo: [
      {
        Variant: "Color",
        Type: "Red"
      },
      {
        Variant: "Size",
        Type: "Big"
      }
    ],
    Stock: 10
  },
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductCombo() {
  return (
    <div>
      <div style={{
        ...Flex,
        justifyContent: "space-between"
      }}>
        <Subtitle1>Combo</Subtitle1>
        <Button appearance="primary" icon={<AddRegular />}>New Combo</Button>
      </div>

      <DelegateDataGrid Items={items} Columns={columns} />
    </div>
  )
}
