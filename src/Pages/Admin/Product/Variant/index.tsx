import { DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { Flex } from "~/Helpers/Styles";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminProductVariantDelete } from "./Delete";
import { AdminProductVariantEdit } from "./Edit";
import { AdminProductNewVariant } from "./New";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IVariantItem {
  Id: number;
  Name: string;
  Types: string[];
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
  twelve: {
    flexBasis: "12%",
    flexGrow: 0
  }
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
const columns: TableColumnDefinition<IVariantItem>[] = [
  createTableColumn<IVariantItem>({
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
  createTableColumn<IVariantItem>({
    columnId: "Name",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().twelve}>
          Name
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().twelve}>
          {item.Name}
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IVariantItem>({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          {
            item.Types.reduce((prev, curr) => {
              return `${prev} ${curr} ;`
            }, "")
          }
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IVariantItem>({
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
          <AdminProductVariantEdit Variant={item} Refresh={refreshVariant} />

          <AdminProductVariantDelete VariantId={item.Id} Refresh={refreshVariant} />
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
let refreshVariant: () => void;

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminProductVariant({ ProdId }: { ProdId: number }) {
  const style = useStyles();

  const { data, run } = useRequest(AdminHub.Product.Get.Variants, {
    defaultParams: [ProdId]
  });

  refreshVariant = () => run(ProdId);

  return <>
    <div className={style.body}>
      <Subtitle1>Variant</Subtitle1>
      <AdminProductNewVariant ProdId={ProdId} Refresh={run} />
    </div>

    <DelegateDataGrid Items={data || []} Columns={columns} />
  </>
}
