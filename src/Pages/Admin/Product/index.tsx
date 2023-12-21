import { Body1Strong, DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { Logger } from "~/Helpers/Logger";
import { AdminHub } from "~/ShopNet/Admin";
import { DelegateDataGrid } from "../../../Components/DataGrid/Delegate";
import { AdminProductDetail } from "./Detail";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface IProductItem {
  Id: number;
  Cover: string;
  Name: string;
  Category: string;
  Variant: number;
  Combo: number;
  Stock: number;
}

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
  }
});

const log = new Logger("Admin", "Product");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 */
const columns: TableColumnDefinition<IProductItem>[] = [
  MakeCoverCol(50, log),
  createTableColumn<IProductItem>({
    columnId: "Product",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Product</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          <Body1Strong>{item.Name}</Body1Strong>
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IProductItem>({
    columnId: "Category",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Category</DataGridHeaderCell>
    },
    renderCell(item) {
      return (
        <DataGridCell>
          <Body1Strong>{item.Category}</Body1Strong>
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IProductItem>({
    columnId: "Variant",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Variant</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Variant}</DataGridCell>
    }
  }),
  createTableColumn<IProductItem>({
    columnId: "Combo",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Combo</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Combo}</DataGridCell>
    }
  }),
  createTableColumn<IProductItem>({
    columnId: "Stock",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Stock</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Stock}</DataGridCell>
    }
  }),
  createTableColumn<IProductItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().two}>
          Detail
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().twoc}>
          <AdminProductDetail ProdId={item.Id} />
        </DataGridCell>
      )
    },
  })
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 */
export function AdminProduct() {
  const { data } = useRequest(() => AdminHub.Product.Get.List(log), {
    onError: log.error
  });

  return (
    <DelegateDataGrid Items={data || []} Columns={columns} />
  )
}
