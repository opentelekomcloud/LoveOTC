import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { IHistoryItem } from ".";
import { OrderDetail } from "./Detail";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const useStyles = makeStyles({
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
export const HistoryColumns: TableColumnDefinition<IHistoryItem>[] = [
  createTableColumn<IHistoryItem>({
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
  createTableColumn<IHistoryItem>({
    columnId: "Products",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Products</DataGridHeaderCell>;
    },
    renderCell(item) {
      return (
        <DataGridCell>
          {item.Orders[0]} {item.Orders.length > 1 && `& +${item.Orders.length - 1}`}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "OrderDate",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Order Date</DataGridHeaderCell>;
    },
    renderCell(item) {
      return <DataGridHeaderCell>{item.OrderDate.toDateString()}</DataGridHeaderCell>;
    }
  }),
  createTableColumn<IHistoryItem>({
    columnId: "TrackNumber",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Track Number</DataGridHeaderCell>;
    },
    renderCell(item) {
      return <DataGridCell>{item.TrackNumber}</DataGridCell>;
    }
  }),
  createTableColumn<IHistoryItem>({
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
  createTableColumn<IHistoryItem>({
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
  createTableColumn<IHistoryItem>({
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
