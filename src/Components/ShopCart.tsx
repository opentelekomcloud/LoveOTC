import { Body1Strong, Button, Caption1, DataGrid, DataGridBody, DataGridCell, DataGridRow, Field, Image, Popover, PopoverSurface, PopoverTrigger, SpinButton, TableColumnDefinition, ToggleButton, createTableColumn } from "@fluentui/react-components";
import { CartRegular, DeleteRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { ColFlex, Cover } from "~/Helpers/Styles";
import { Confirm } from "./Confirm";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface ICartItem {
  Id: number;
  Image: string;
  Name: string;
  Type: string;
  Quantity: number;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<ICartItem>[] = [
  createTableColumn<ICartItem>({
    columnId: "Cover",
    renderCell(item) {
      return <Image shape="square" style={{
        ...Cover,
        aspectRatio: "1",
        height: "44px"
      }} src={item.Image} />
    },
  }),
  createTableColumn<ICartItem>({
    columnId: "Product",
    renderCell(item) {
      return (
        <div style={ColFlex}>
          <Body1Strong>{item.Name}</Body1Strong>
          <Caption1>{item.Type}</Caption1>
        </div>
      )
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Num",
    renderCell(item) {
      return (
        <Field defaultValue={item.Quantity}>
          <SpinButton style={{ width: "44px" }} />
        </Field>
      )
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Action",
    renderCell(item) {
      return <Button appearance="subtle" icon={<DeleteRegular />} />
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
        <DataGrid
          items={items}
          columns={columns}
          getRowId={(item: ICartItem) => item.Id}
        >
          <DataGridBody<ICartItem>>
            {({ item, rowId }) => (
              <DataGridRow<ICartItem> key={rowId}>
                {({ columnId, renderCell }) => (
                  <DataGridCell style={{
                    flexBasis: "unset",
                    flexGrow: columnId === "Product" ? 1 : 0
                  }}>
                    {renderCell(item)}
                  </DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>

        <Confirm />
      </PopoverSurface>
    </Popover>
  )
}
