import { Body1Strong, Button, DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { OpenRegular } from "@fluentui/react-icons";
import { CoverCol } from "~/Helpers/CoverCol";
import { DelegateDataGrid } from "../../../Components/DelegateDataGrid";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface IProductItem {
  Id: number;
  Image: string;
  Name: string;
  Category: string;
  Variant: number;
  Type: number;
  Stock: number;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IProductItem>[] = [
  CoverCol,
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
    columnId: "Type",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Type</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Type}</DataGridCell>
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
        <DataGridHeaderCell style={{ flexBasis: "2.5%", flexGrow: "unset" }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "2.5%", flexGrow: "unset", justifyContent: "center" }}>
          <Button
            appearance="subtle"
            icon={<OpenRegular />}
          />
        </DataGridCell>
      )
    },
  })
]

const items: IProductItem[] = [
  {
    Id: 1,
    Image: "https://picsum.photos/550",
    Name: "OTC SHIRT - GREY",
    Category: "Clothes",
    Variant: 2,
    Type: 4,
    Stock: 10,
  },
  {
    Id: 2,
    Image: "https://picsum.photos/600",
    Name: "OTC Cap - Cap and Cap",
    Category: "Hat",
    Variant: 2,
    Type: 4,
    Stock: 20,
  }
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function AdminProduct() {
  return (
    <DelegateDataGrid Items={items} Columns={columns} />
  )
}
