import { Button, Combobox, DataGridCell, DataGridHeaderCell, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Label, Option, SpinButton, TableColumnDefinition, Toast, ToastTitle, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, DismissRegular } from "@fluentui/react-icons";
import { useAsyncEffect, useBoolean } from "ahooks";
import { useState } from "react";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IVariantItem {
  Id: number;
  Name: string;
  Types: string[];
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IUpdateComboItem extends IVariantItem {
  Update: (type: string) => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IUpdateComboItem>[] = [
  createTableColumn({
    columnId: "Variant",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Variant</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Name}</DataGridCell>
    }
  }),
  createTableColumn({
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
 * @version 1.0.0
 */
export function AdminProductNewCombo({ ProdId, Refresh }: { ProdId: number; Refresh: () => void }) {
  const [open, { toggle }] = useBoolean();

  const [varis, setVaris] = useState<IVariantItem[]>([]);
  const [combo, setCombo] = useState<Record<string, string>>({});
  const [stock, setStock] = useState(1);

  const { data: varIds } = AdminHub.Product.Get.useVariants(ProdId, {
    onError: log.error
  });

  useAsyncEffect(async () => {
    if (!varIds)
      return;

    const varis: IVariantItem[] = [];

    for (const i of varIds) {
      const typeIds = await AdminHub.Product.Get.Types(i);
      const types = [];

      for (const typeId of typeIds) {
        const type = await Hub.Product.Get.Type(typeId);
        types.push(type);
      }

      const { Name } = await Hub.Product.Get.Variant(i);

      varis.push({
        Id: i,
        Name: Name,
        Types: types.map(x => x.Name)
      });

      combo[Name] = "";
    }

    setVaris(varis);
    setCombo({ ...combo });
  }, [varIds]);

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Post.useCombo({
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

              <Button
                disabled={loading}
                appearance="primary"
                onClick={() => run(ProdId, combo, stock)}
              >
                Create
              </Button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
