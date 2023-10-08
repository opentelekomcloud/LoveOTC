import { DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { AdminProductComboDelete } from "./Delete";
import { AdminProductComboDetail, IDetailComboItem } from "./Detail";
import { AdminProductNewCombo } from "./New";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export interface IComboItem {
  Id: number;
  Combo: Record<string, string>;
  Stock: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...Flex,
    justifyContent: "space-between"
  },
  four: {
    flexBasis: "4%",
    flexGrow: 0
  },
  seven: {
    flexBasis: "7%",
    flexGrow: 0
  },
  five: {
    flexBasis: "5%",
    flexGrow: 0
  }
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IDetailComboItem>[] = [
  createTableColumn<IDetailComboItem>({
    columnId: "Id",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().four}>
          Id
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().four}>
          {item.Id}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IDetailComboItem>({
    columnId: "Combo",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Combo</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{Object.entries(item.Combo).reduce((prev, curr) => `${prev} ${curr[0]} : ${curr[1]} ;`, "")}</DataGridCell>
    }
  }),
  createTableColumn<IDetailComboItem>({
    columnId: "Stock",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().five}>
          Stock
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().five}>
          {item.Stock}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IDetailComboItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().seven}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().seven}>
          <AdminProductComboDetail {...item} />

          <AdminProductComboDelete ComboId={item.Id} Refresh={() => item.Refresh(item.ProdId)} />
        </DataGridCell>
      )
    }
  })
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminProductCombo({ ProdId }: { ProdId: number }) {
  const { data, run } = useRequest(Hub.Product.Get.Combo, {
    defaultParams: [ProdId]
  });

  return <>
    <div className={useStyles().body}>
      <Subtitle1>Combo</Subtitle1>
      <AdminProductNewCombo ProdId={ProdId} Refresh={run} />
    </div>

    <DelegateDataGrid Items={data?.map(x => ({ ProdId, Refresh: run, ...x })) || []} Columns={columns} />
  </>
}
