import { Body1Strong, Button, Caption1, DataGridCell, DataGridHeaderCell, Link, SkeletonItem, TableColumnDefinition, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { useConst } from "@fluentui/react-hooks";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useInViewport, useRequest } from "ahooks";
import { useEffect, useRef } from "react";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { IComment, OrderComment } from "~/Components/Order/Comment";
import { OrderInfo } from "~/Components/OrderInfo";
import { useRouter } from "~/Components/Router";
import { ICartItem } from "~/Components/ShopCart";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ICompLog } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { OrderAction } from "./Action";

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
 * @version 1.0.0
 */
export function OrderDetail({ OrderId, ParentLog }: { OrderId: number } & ICompLog) {
  const log = useConst(() => ParentLog.With("Detail"));

  const [open, { set }] = useBoolean();
  const { Nav, Paths } = useRouter();
  const curr = parseInt(Paths.at(1)!);

  useEffect(() => set(curr === OrderId), [curr]);
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

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

      <DrawerBody ref={ref}>
        {inViewport && <DeferredBody OrderId={OrderId} ParentLog={log} />}
      </DrawerBody>
    </Drawer>
  </>
}

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
function DeferredBody({ OrderId, ParentLog }: { OrderId: number } & ICompLog) {
  const style = useStyles();
  const { Nav } = useRouter();

  const { data: order, run: runOrder } = useRequest(() => Hub.Order.Get.Order(OrderId), {
    onError(e) {
      Nav("History");
      ParentLog.error(e);
    },
    manual: true
  });

  const { data: cart, run: runItems, loading } = Hub.Order.Get.useItems(OrderId, ParentLog);

  const run = () => {
    runItems();
    runOrder();
  };

  return (
    <div className={style.body}>
      <OrderInfo OrderId={OrderId} Order={order} />

      <DelegateDataGrid
        Items={cart}
        Columns={[MakeCoverCol(44, ParentLog), ...columns]}
      />

      {loading && <SkeletonItem size={48} />}

      <OrderComment OrderId={OrderId} Status={order?.Status} Refresh={run} ParentLog={ParentLog} />

      <OrderAction OrderId={OrderId} Status={order?.Status} Refresh={run} ParentLog={ParentLog} />
    </div>
  );
}
