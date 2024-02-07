import { Button, Combobox, DataGridCell, DataGridHeaderCell, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Label, Option, SpinButton, TableColumnDefinition, Toast, ToastTitle, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, DismissRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IVariantItem } from "../Variant";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface INewComboItem extends IVariantItem {
  Update: (type: string) => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<INewComboItem>[] = [
  createTableColumn<INewComboItem>({
    columnId: "Variant",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Variant</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Name}</DataGridCell>
    }
  }),
  createTableColumn<INewComboItem>({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          <Combobox onOptionSelect={(_, x) => item.Update(x.optionValue!)}>
            {
              item.Types.map((v, i) => <Option key={i}>{v}</Option>)
            }
          </Combobox>
        </DataGridCell>
      )
    }
  })
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...Flex,
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: tokens.spacingVerticalM,
    marginTop: tokens.spacingHorizontalM
  },
});

const log = new Logger("Admin", "Product", "Detail", "Combo", "NewCombo");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.3
 */
export function AdminProductNewCombo({ ProdId, Refresh }: { ProdId: number; Refresh: () => void }) {
  const [open, { toggle }] = useBoolean();
  const [combo, setCombo] = useState<Record<string, string>>({});
  const [stock, setStock] = useState(1);

  const { data: varis } = useRequest(() => AdminHub.Product.Get.Variants(ProdId, log), {
    onSuccess(data) {
      for (const i of data)
        combo[i.Name] = "";

      setCombo({ ...combo });
    },
    onError: log.error
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Post.useCombo({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Create Combo",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Combo Created</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
      toggle();
    },
  });

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<AddRegular />}>
          New Combo
        </Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle action={
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<DismissRegular />} />
            </DialogTrigger>
          }>
            New Combo
          </DialogTitle>

          <DialogContent>
            <DelegateDataGrid
              Items={varis?.map(x => ({
                Update(type: string) {
                  combo[x.Name] = type;
                  setCombo({ ...combo });
                },
                ...x
              }))}
              Columns={columns}
            />

            <div className={useStyles().body}>
              <Label>Stock</Label>

              <SpinButton value={stock} min={0} onChange={(_, v) => {
                const val = parseInt(v.value || v.displayValue as any);

                if (isNaN(val) || val < 0)
                  return;

                setStock(val);
              }} />

              <Button appearance="primary" onClick={() => run(ProdId, combo, stock)}>Create</Button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
