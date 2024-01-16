import { Body1Strong, Button, Caption1, DataGridCell, DataGridHeaderCell, Link, TableColumnDefinition, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { useConst } from "@fluentui/react-hooks";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useEffect } from "react";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { OrderInfo } from "~/Components/OrderInfo";
import { useRouter } from "~/Components/Router";
import { ICartItem } from "~/Components/ShopCart";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ICompLog } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { OrderAction } from "./Action";
import { OrderAppend } from "./Append";
import { IComment, OrderComment } from "./Comment";

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
 * @version 0.1.1
 */
const columns: TableColumnDefinition<ICartItem>[] = [
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

          <Caption1>
            {Object.values(item.Type).reduce((prev, curr) => `${prev} ${curr},`, "")}
          </Caption1>
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
 * @version 0.1.1
 */
export interface IOrderDetail {
  ShopCart: ICartItem[];
  Comments?: IComment[];
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.5
 */
export function OrderDetail({ OrderId, ParentLog }: { OrderId: number } & ICompLog) {
  const log = useConst(() => ParentLog.With("Detail"));

  const style = useStyles();
  const [open, { setTrue, setFalse }] = useBoolean();

  const { Nav, Paths } = useRouter();
  const curr = parseInt(Paths.at(1)!);

  const { data, run: runDetail } = useRequest(() => Hub.Order.Get.Detail(OrderId, log), {
    manual: true,
    onError: log.error
  });

  const { data: order, run: runOrder } = useRequest(() => Hub.Order.Get.Order(OrderId), {
    onError(e) {
      Nav("History");
      log.error(e);
    },
    manual: true
  });

  function run() {
    runOrder();
    runDetail();
  }

  useEffect(() => {
    if (curr === OrderId) {
      run();
      setTrue();
    } else
      setFalse();
  }, [curr]);

  return <>
    <Button
      appearance="subtle"
      icon={<OpenRegular />}
      onClick={() => Nav("History", OrderId)}
    />

    <Drawer
      open={open}
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
              onClick={() => Nav("History")}
            />
          }
        >
          Order Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={style.body}>
          <OrderInfo OrderId={OrderId} Order={order} />

          <DelegateDataGrid
            Items={data?.ShopCart}
            Columns={[MakeCoverCol(44, log), ...columns]}
          />

          <OrderComment Comments={data?.Comments} />

          <OrderAppend OrderId={OrderId} Status={order?.Status} Refresh={run} ParentLog={log} />

          <OrderAction OrderId={OrderId} Status={order?.Status} Refresh={run} ParentLog={log} />
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
