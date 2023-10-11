import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { IOrderItem } from ".";
import { OrderDetail } from "./Detail";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  five: {
    flexBasis: "5%",
    flexGrow: 0
  },
  ten: {
    flexBasis: "10%",
    flexGrow: 0
  },
  two: {
    flexBasis: "2.5%",
    flexGrow: 0
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
export const HistoryColumns: TableColumnDefinition<IOrderItem>[] = [
  createTableColumn<IOrderItem>({
    columnId: "OrderId",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().five}>
          Order Id
        </DataGridHeaderCell>
      );
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().five}>
          {item.Id}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Products",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Products</DataGridHeaderCell>;
    },
    renderCell(item) {
      return (
        <DataGridCell>
          {item.Items[0]} {item.Items.length > 1 && `& +${item.Items.length - 1}`}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "OrderDate",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Order Date</DataGridHeaderCell>;
    },
    renderCell(item) {
      return <DataGridHeaderCell>{item.OrderDate.toLocaleDateString()}</DataGridHeaderCell>;
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "TrackNumber",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Track Number</DataGridHeaderCell>;
    },
    renderCell(item) {
      return <DataGridCell>{item.TrackNumber}</DataGridCell>;
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Quantity",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().ten}>
          Quantity
        </DataGridHeaderCell>
      );
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().ten}>
          {item.Quantity}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Status",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().ten}>
          Order State
        </DataGridHeaderCell>
      );
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().ten}>
          {item.Status}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Detail",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().two}>
          Detail
        </DataGridHeaderCell>
      );
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().two}>
          <OrderDetail OrderId={item.Id} />
        </DataGridCell>
      );
    },
  })
];
