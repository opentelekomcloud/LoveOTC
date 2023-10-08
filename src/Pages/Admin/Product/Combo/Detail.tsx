import { Button, Combobox, DataGridCell, DataGridHeaderCell, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Label, Option, SpinButton, TableColumnDefinition, Toast, ToastTitle, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { isInteger } from "lodash-es";
import { useState } from "react";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Flex } from "~/Helpers/Styles";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IComboItem } from ".";
import { IVariantItem } from "../Variant";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IEditComboItem extends IVariantItem {
  Current: string;
  Update: (type: string) => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IEditComboItem>[] = [
  createTableColumn<IEditComboItem>({
    columnId: "Variant",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Variant</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Name}</DataGridCell>
    }
  }),
  createTableColumn<IEditComboItem>({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          <Combobox
            defaultValue={item.Current}
            defaultSelectedOptions={[item.Current]}
            onOptionSelect={(_, x) => item.Update(x.optionValue!)}
          >
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

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IDetailComboItem extends IComboItem {
  ProdId: number;
  Refresh: (prodId: number) => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminProductComboDetail({ Id, ProdId, Combo, Stock, Refresh }: IDetailComboItem) {
  const [open, { toggle }] = useBoolean();
  const [combo, setCombo] = useState(Combo);
  const [stock, setStock] = useState(Stock);

  const { data: varis } = useRequest(AdminHub.Product.Get.Variants, {
    defaultParams: [ProdId]
  });

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Patch.Combo, {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Update Combo",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Combo Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh(ProdId);
      toggle();
    },
  });

  return (
    <Dialog open={open} onOpenChange={toggle}>
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
            <DelegateDataGrid
              Items={varis?.map(x => ({
                Current: combo[x.Name],
                Update(type: string) {
                  combo[x.Name] = type;
                  setCombo({ ...combo });
                },
                ...x
              })) || []}
              Columns={columns}
            />

            <div className={useStyles().body}>
              <Label>Stock</Label>

              <SpinButton value={stock} min={0} onChange={(_, x) => {
                if (x.value)
                  setStock(x.value);
                else if (x.displayValue) {
                  const i = parseInt(x.displayValue);
                  if (isInteger(i))
                    setStock(i);
                }
              }} />

              <Button appearance="primary" onClick={() => run(Id, combo, stock)}>Submit</Button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
