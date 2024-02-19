import { Body1Strong, Caption1, DataGridCell, DataGridHeaderCell, Link, TableColumnDefinition, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { OrderComment } from "~/Components/Order/Comment";
import { OrderInfo } from "~/Components/Order/Info";
import { ICartItem } from "~/Components/ShopCart";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ColFlex } from "~/Helpers/Styles";
import { AdminOrderAction } from "~/Pages/Admin/Order/Action";
import { AdminOrderList } from "~/Pages/Admin/Order/List";
import { Shipment } from "~/Pages/Admin/Order/Ship";
import { Hub } from "~/ShopNet";
import { IOrderComp } from ".";
import { OrderAction } from "../../Pages/History/Action";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalXXL
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
 * @since 1.3.5
 * @version 1.4.0
 */
export function OrderDetailDrawer({ OrderId, Admin, ParentLog }: IOrderComp) {
  const style = useStyles();
  const { data: cart } = Hub.Order.Get.useItems(OrderId, ParentLog, Admin);

  return (
    <div className={style.body}>
      <OrderInfo OrderId={OrderId} Admin={Admin} ParentLog={ParentLog} />

      {
        Admin
          ?
          <>
            <AdminOrderList Items={cart} />
            <Shipment OrderId={OrderId} />
          </>
          :
          <DelegateDataGrid
            Items={cart}
            Columns={[MakeCoverCol(44, ParentLog), ...columns]}
          />
      }

      <OrderComment OrderId={OrderId} ParentLog={ParentLog} Admin={Admin} />

      {
        Admin
          ?
          <AdminOrderAction OrderId={OrderId} />
          :
          <OrderAction OrderId={OrderId} />
      }
    </div>
  );
}
