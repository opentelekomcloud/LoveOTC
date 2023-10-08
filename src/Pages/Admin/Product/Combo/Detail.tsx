import { Button, DataGridCell, DataGridHeaderCell, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Label, SpinButton, TableColumnDefinition, createTableColumn, tokens } from "@fluentui/react-components";
import { AddRegular, DismissRegular, EditRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Flex } from "~/Helpers/Styles";
import { IType } from ".";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IComboDetailItem extends IType {
  Id: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IComboDetailItem>[] = [
  createTableColumn<IComboDetailItem>({
    columnId: "Variant",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Variant</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Variant}</DataGridCell>
    }
  }),
  createTableColumn<IComboDetailItem>({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Type}</DataGridCell>
    }
  }),
  createTableColumn<IComboDetailItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "8%", flexGrow: 0 }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "8%", flexGrow: 0 }}>
          <Button
            appearance="subtle"
            icon={<EditRegular />}
          />
        </DataGridCell>
      )
    }
  })
]

const items: IComboDetailItem[] = [
  {
    Id: 0,
    Variant: "Color",
    Type: "White",
  },
  {
    Id: 1,
    Variant: "Size",
    Type: "Big",
  }
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductComboDetail() {
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
            Combo Detail
          </DialogTitle>

          <DialogContent>
            <DelegateDataGrid Items={items} Columns={columns} />

            <div style={{
              ...Flex,
              justifyContent: "flex-end",
              alignItems: "center",
              columnGap: tokens.spacingVerticalM,
              marginTop: tokens.spacingHorizontalM
            }}>
              <Label>Stock</Label>

              <SpinButton />

              <Button icon={<AddRegular />}>Add Type</Button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
