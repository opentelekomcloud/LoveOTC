import { Body1Strong, Button, Caption1, DataGridCell, Field, Popover, PopoverSurface, PopoverTrigger, SpinButton, TableColumnDefinition, ToggleButton, createTableColumn } from "@fluentui/react-components";
import { CartRegular, DeleteRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ColFlex } from "~/Helpers/Styles";
import { Confirm } from "./Confirm";
import { DelegateDataGrid } from "./DelegateDataGrid";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface ICartItem {
  Id: number;
  Image: string;
  Name: string;
  Type: string;
  Quantity: number;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export const CartColumns: TableColumnDefinition<ICartItem>[] = [
  MakeCoverCol(44),
  createTableColumn<ICartItem>({
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
  createTableColumn<ICartItem>({
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
  createTableColumn<ICartItem>({
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

const items: ICartItem[] = [
  {
    Id: 1,
    Image: "https://picsum.photos/550",
    Name: "OTC SHIRT - GREY",
    Type: "Short Sleeve, S",
    Quantity: 1
  },
  {
    Id: 2,
    Image: "https://picsum.photos/600",
    Name: "OTC Cap - Cap and Cap",
    Type: "Red, Long and Long",
    Quantity: 1
  }
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function ShopCart() {
  const [open, { toggle }] = useBoolean();

  return (
    <Popover withArrow open={open} onOpenChange={toggle}>
      <PopoverTrigger disableButtonEnhancement>
        <ToggleButton icon={<CartRegular />} appearance="subtle" size="large" checked={open} />
      </PopoverTrigger>

      <PopoverSurface style={ColFlex}>
        <DelegateDataGrid Items={items} Columns={CartColumns} NoHeader />
        <Confirm />
      </PopoverSurface>
    </Popover>
  )
}
