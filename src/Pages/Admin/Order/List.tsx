import { Body1Strong, Button, Caption1, DataGridCell, Field, SpinButton, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { ColFlex } from "~/Helpers/Styles";
import { IOrder } from "~/Pages/History";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IOrderItem extends IOrder {
  Id: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IOrderItem>[] = [
  createTableColumn<IOrderItem>({
    columnId: "Product",
    renderCell(item) {
      return (
        <DataGridCell style={{
          ...ColFlex,
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <Body1Strong>{item.Name}</Body1Strong>
          <Caption1>{item.Type}</Caption1>
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Num",
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "10%", flexGrow: 0 }}>
          <Field defaultValue={item.Quantity}>
            <SpinButton />
          </Field>
        </DataGridCell>
      )
    }
  }),
  createTableColumn<IOrderItem>({
    columnId: "Action",
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "7%", flexGrow: 0 }}>
          <Button appearance="subtle" icon={<DeleteRegular />} />
        </DataGridCell>
      )
    },
  })
]

const items: IOrderItem[] = [

]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminOrderList() {
  return (
    <DelegateDataGrid Items={items} Columns={columns} NoHeader />
  )
}
