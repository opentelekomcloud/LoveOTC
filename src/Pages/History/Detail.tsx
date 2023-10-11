import { Body1Strong, Button, Caption1, DataGridCell, DataGridHeaderCell, Field, Label, Link, TableColumnDefinition, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useMount, useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { OrderPersona } from "~/Components/Persona";
import { useRouter } from "~/Components/Router";
import { ICartItem } from "~/Components/ShopCart";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { OrderAppend } from "./Append";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalL
  },
  prod: {
    ...ColFlex,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  qua: {
    flexBasis: "10%",
    flexGrow: 0,
    justifyContent: "center"
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<ICartItem>[] = [
  MakeCoverCol(44),
  createTableColumn<ICartItem>({
    columnId: "Product",
    renderHeaderCell() {
      return <DataGridHeaderCell>Product Name & Types</DataGridHeaderCell>;
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().prod}>
          <Link href={`/Product/${item.ProdId}`} appearance="subtle">
            <Body1Strong>{item.Name}</Body1Strong>
          </Link>

          <Caption1>{Object.values(item.Type).reduce((prev, curr) => `${prev} ${curr},`, "")}</Caption1>
        </DataGridCell>
      );
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Quantity",
    renderHeaderCell() {
      return <DataGridHeaderCell className={useStyles().qua}>Quantity</DataGridHeaderCell>;
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().qua}>
          {item.Quantity}
        </DataGridCell>
      );
    }
  })
];

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export interface IOrderDetail {
  ShopCart: ICartItem[];
  Comments?: string[];
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function OrderDetail({ OrderId }: { OrderId: number }) {
  const style = useStyles();
  const { Nav, Paths } = useRouter();
  const [open, { toggle, setTrue }] = useBoolean();

  const { data, run } = useRequest(Hub.Order.Get.Detail, {
    onError() {
      throw Nav("History");
    },
    manual: true
  })

  useMount(() => {
    if (parseInt(Paths.at(1)!) === OrderId) {
      run(OrderId);
      setTrue();
    }
  });

  return <>
    <Button appearance="subtle" icon={<OpenRegular />} onClick={() => {
      Nav("History", OrderId);
      run(OrderId);
      setTrue();
    }} />

    <Drawer
      open={open}
      onOpenChange={toggle}
      position="end"
      size="medium"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              onClick={() => {
                Nav("History");
                toggle();
              }}
            />
          }
        >
          Order Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={style.body}>
          <OrderPersona OrderId={OrderId} />

          <DelegateDataGrid Items={data?.ShopCart || []} Columns={columns} />

          <Field label="Comment" size="large">
            <Label>{data?.Comments?.reduce((prev, curr) => prev + curr, "")}</Label>
          </Field>

          <OrderAppend OrderId={OrderId} Refresh={run} />
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
