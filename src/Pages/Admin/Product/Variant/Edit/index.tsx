import { Button, DataGridCell, DataGridHeaderCell, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, TableColumnDefinition, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminProductTypeDelete } from "./Delete";
import { AdminProductVariantName } from "./Name";
import { AdminProductType } from "./Type";

interface ITypeItem {
  Id: number;
  VariantId: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalM
  },
  twelve: {
    flexBasis: "12%",
    flexGrow: 0
  }
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
const columns: TableColumnDefinition<ITypeItem>[] = [
  createTableColumn({
    columnId: "Name",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Name</DataGridHeaderCell>
    },
    renderCell({ Id }) {
      const { data } = Hub.Product.Get.useType(Id)
      return <DataGridCell>{data?.Name}</DataGridCell>
    }
  }),
  createTableColumn({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().twelve}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell({ Id, VariantId }) {
      return (
        <DataGridCell className={useStyles().twelve}>
          <AdminProductType VariantId={VariantId} TypeId={Id} />

          <AdminProductTypeDelete TypeId={Id} />
        </DataGridCell>
      )
    }
  })
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
export function AdminProductVariantEdit({ VariantId }: { VariantId: number; }) {
  const { data } = AdminHub.Product.Get.useTypes(VariantId);

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

          <DialogContent className={useStyles().body}>
            <AdminProductVariantName VariantId={VariantId} />

            <DelegateDataGrid
              Items={data?.map(x => ({ Id: x, VariantId }))}
              Columns={columns}
            />
          </DialogContent>

          <DialogActions>
            <AdminProductType VariantId={VariantId} New />
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
