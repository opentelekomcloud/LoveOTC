import { DataGrid, DataGridBody, DataGridHeader, DataGridRow, TableColumnDefinition, TableRowId } from "@fluentui/react-components";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export interface IDataGrid<T extends { Id: TableRowId; }> {
  Items: T[];
  Columns: TableColumnDefinition<T>[];
  NoHeader?: true;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export function DelegateDataGrid<T extends { Id: TableRowId; }>({ Items, Columns, NoHeader }: IDataGrid<T>) {
  return (
    <DataGrid
      items={Items}
      columns={Columns}
      getRowId={(item: T) => item.Id}
    >
      {
        !NoHeader &&
        <DataGridHeader>
          <DataGridRow<T>>
            {({ renderHeaderCell }) => renderHeaderCell()}
          </DataGridRow>
        </DataGridHeader>
      }

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
