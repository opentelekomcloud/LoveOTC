import { DataGridCell, DataGridHeaderCell, Label, SpinButton, TableColumnDefinition, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { OrderDetail } from "~/Components/Order";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { IOrderItem } from "~/Pages/History";
import { HistoryColumns } from "~/Pages/History/Columns";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  two: {
    flexBasis: "2.5%",
    flexGrow: 0
  },
  twoc: {
    flexBasis: "2.5%",
    flexGrow: 0,
    justifyContent: "center"
  },
  ten: {
    flexBasis: "10%",
    flexGrow: 0
  },
  page: {
    ...Flex,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: tokens.spacingVerticalXL,
    columnGap: tokens.spacingHorizontalM
  },
  spin: {
    width: "4rem",
  }
});

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export interface IAdminOrderItem extends IOrderItem {
  User: string;
}

const log = new Logger("Admin", "Order");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
const columns: TableColumnDefinition<IAdminOrderItem>[] = [
  ...HistoryColumns(log).slice(0, -1),
  createTableColumn<IAdminOrderItem>({
    columnId: "User",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().ten}>
          User
        </DataGridHeaderCell>
      );
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().ten}>
          {item.User}
        </DataGridCell>
      );
    }
  }),
  createTableColumn<IAdminOrderItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().two}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().twoc}>
          <OrderDetail OrderId={item.Id} ParentLog={log} Admin />
        </DataGridCell>
      )
    },
  })
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 1.0.0
 */
export function AdminOrder() {
  const style = useStyles();

  const { data: count } = useRequest(() => AdminHub.Order.Get.Count(), {
    onError: log.error
  });
  const page = Math.ceil((count || 1) / 30);

  const { data, run } = useRequest((go) => AdminHub.Order.Get.List(go, log), {
    defaultParams: [1],
    debounceWait: 300,
    onError: log.error
  });

  return <>
    <DelegateDataGrid Items={data} Columns={columns} />

    <div className={style.page}>
      <Label>Total {count} Records</Label>

      <SpinButton
        min={1}
        max={page}
        defaultValue={1}
        className={style.spin}
        onChange={(_, data) => {
          const value = parseInt(data.value || data.displayValue as any);

          if (!isNaN(value) && value && value <= page)
            run(value);
        }}
      />

      <Label>/</Label>

      <Label>{page}</Label>
    </div>
  </>
}
