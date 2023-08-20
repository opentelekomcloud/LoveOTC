import { DataGrid, DataGridBody, DataGridHeader, DataGridRow, TableColumnDefinition, TableRowId } from "@fluentui/react-components";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface IDelegateDataGrid<T extends { Id: TableRowId; }> {
  Items: T[];
  Columns: TableColumnDefinition<T>[];
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function DelegateDataGrid<T extends { Id: TableRowId; }>({ Items, Columns }: IDelegateDataGrid<T>) {
  return (
    <DataGrid
      items={Items}
      columns={Columns}
      getRowId={(item: T) => item.Id}
    >
      <DataGridHeader>
        <DataGridRow<T>>
          {({ renderHeaderCell }) => renderHeaderCell()}
        </DataGridRow>
      </DataGridHeader>

      <DataGridBody<T>>
        {({ item, rowId }) => (
          <DataGridRow<T> key={rowId}>
            {({ renderCell }) => renderCell(item)}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}
