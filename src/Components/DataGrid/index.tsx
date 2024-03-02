import { DataGrid, DataGridBody, DataGridHeader, DataGridRow, SkeletonItem, TableColumnDefinition, TableRowId } from "@fluentui/react-components";

interface IDataGrid<T> {
  Items: T[] | undefined;
  Columns: TableColumnDefinition<T>[];
  NoHeader?: true;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
export function DelegateDataGrid<T>({ Items, Columns, NoHeader }: IDataGrid<T> & { getRowId: (item: T) => TableRowId }): JSX.Element;
export function DelegateDataGrid<T extends { Id: TableRowId; }>({ Items, Columns, NoHeader }: IDataGrid<T>): JSX.Element;
export function DelegateDataGrid<T>({ Items, Columns, NoHeader, getRowId }: IDataGrid<T> & { getRowId?: (item: T) => TableRowId }) {
  const id = getRowId || ((item: T & { Id: TableRowId; }) => item.Id);

  return (
    <DataGrid
      items={Items || []}
      columns={Columns}
      getRowId={id}
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

      {!Items && <SkeletonItem size={48} />}
    </DataGrid>
  );
}
