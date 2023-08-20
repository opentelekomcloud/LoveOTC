import { Button, DataGridCell, DataGridHeaderCell, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { AddRegular, DeleteRegular, DismissRegular, EditRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface ITypeItem {
  Id: number;
  Name: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<ITypeItem>[] = [
  createTableColumn<ITypeItem>({
    columnId: "Name",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Name</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Name}</DataGridCell>
    }
  }),
  createTableColumn<ITypeItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "12%", flexGrow: "unset" }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "12%", flexGrow: "unset" }}>
          <Button
            appearance="subtle"
            icon={<EditRegular />}
          />

          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
          />
        </DataGridCell>
      )
    }
  })
]

const items: ITypeItem[] = [
  {
    Id: 0,
    Name: "White",
  },
  {
    Id: 1,
    Name: "Red",
  }
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductVariantEdit() {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance="subtle"
          icon={<EditRegular />}
        />
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle action={
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<DismissRegular />} />
            </DialogTrigger>
          }>
            Variant Detail
          </DialogTitle>

          <DialogContent>
            <DelegateDataGrid Items={items} Columns={columns} />
          </DialogContent>

          <DialogActions>
            <Button icon={<AddRegular />} appearance="primary">New Type</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
