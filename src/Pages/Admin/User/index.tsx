import { Button, Checkbox, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { ICartItem } from "~/Components/ShopCart";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface IUserItem {
  Id: number;
  Name: string;
  Email: string;
  Admin?: boolean;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IUserItem>[] = [
  createTableColumn<IUserItem>({
    columnId: "Name",
    renderHeaderCell: () => {
      return "Real Name";
    },
    renderCell(item) {
      return item.Name;
    }
  }),
  createTableColumn<IUserItem>({
    columnId: "Email",
    renderHeaderCell: () => {
      return "E-Mail";
    },
    renderCell(item) {
      return item.Email;
    }
  }),
  createTableColumn<IUserItem>({
    columnId: "Admin",
    renderHeaderCell: () => {
      return "Admin";
    },
    renderCell(item) {
      return <Checkbox defaultChecked={item.Admin} />
    },
  }),
  createTableColumn<IUserItem>({
    columnId: "Delete",
    renderHeaderCell: () => {
      return "Delete";
    },
    renderCell(item) {
      return <Button appearance="subtle" icon={<DeleteRegular />} />
    },
  })
]

const items: IUserItem[] = [
  {
    Id: 1,
    Name: "Aloento",
    Email: "Aloento@T-Systems.com",
    Admin: true
  },
  {
    Id: 2,
    Name: "SomeOne",
    Email: "SomeOne@T-Systems.com",
  },
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function AdminUser() {
  return (
    <DataGrid
      items={items}
      columns={columns}
      getRowId={(item: ICartItem) => item.Id}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>
              {renderHeaderCell()}
            </DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>

      <DataGridBody<ICartItem>>
        {({ item, rowId }) => (
          <DataGridRow<ICartItem> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>
                {renderCell(item)}
              </DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  )
}
