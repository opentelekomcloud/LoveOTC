import { Button, DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { AdminProductComboDetail } from "./Detail";
import { AdminProductNewCombo } from "./New";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IComboItem {
  Id: number;
  Combo: IType[];
  Stock: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IType {
  Variant: string;
  Type: string;
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
const columns: TableColumnDefinition<IComboItem>[] = [
  createTableColumn<IComboItem>({
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
  createTableColumn<IComboItem>({
    columnId: "Combo",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Combo</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Combo.reduce((prev, curr) => `${prev} ${curr.Variant} : ${curr.Type} ;`, "")}</DataGridCell>
    }
  }),
  createTableColumn<IComboItem>({
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
  createTableColumn<IComboItem>({
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
          <AdminProductComboDetail />

          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
          />
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

    <DelegateDataGrid Items={data?.map((v, i) => ({ Id: i, ...v })) || []} Columns={columns} />
  </>
}
