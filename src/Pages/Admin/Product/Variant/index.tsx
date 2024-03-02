import { DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminProductVariantDelete } from "./Delete";
import { AdminProductVariantEdit } from "./Edit";
import { AdminProductNewVariant } from "./New";

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

const log = new Logger("Admin", "Product", "Detail", "Variant");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
const columns: TableColumnDefinition<number>[] = [
  createTableColumn({
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
          {item}
        </DataGridCell>
      )
    }
  }),
  createTableColumn({
    columnId: "Name",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().twelve}>
          Name
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      const { data } = Hub.Product.Get.useVariant(item, {
        onError: log.error
      });

      return (
        <DataGridCell className={useStyles().twelve}>
          {data?.Name}
        </DataGridCell>
      )
    }
  }),
  createTableColumn({
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      const { data } = AdminHub.Product.Get.useTypeList(item, {
        onError: log.error
      });

      return (
        <DataGridCell>
          {
            data?.reduce((prev, { Name }) => {
              return `${prev} ${Name} ;`
            }, "")
          }
        </DataGridCell>
      )
    }
  }),
  createTableColumn({
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
          <AdminProductVariantEdit VariantId={item} />

          <AdminProductVariantDelete VariantId={item} />
        </DataGridCell>
      )
    }
  })
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
export function AdminProductVariant({ ProdId }: { ProdId: number }) {
  const style = useStyles();

  const { data } = AdminHub.Product.Get.useVariants(ProdId, {
    onError: log.error
  });

  return <>
    <div className={style.body}>
      <Subtitle1>Variant</Subtitle1>
      <AdminProductNewVariant ProdId={ProdId} />
    </div>

    <DelegateDataGrid Items={data} Columns={columns} getRowId={x => x} />
  </>
}
