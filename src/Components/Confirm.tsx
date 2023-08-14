import { Body1Strong, Button, Caption1, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, Field, Image, Label, SpinButton, TableColumnDefinition, Textarea, createTableColumn, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DeleteRegular, DismissRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";

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
    renderHeaderCell: () => {
      return <div style={{ width: "44px" }} />;
    },
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
    renderHeaderCell: () => {
      return "Product";
    },
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
    renderHeaderCell: () => {
      return "Quantity";
    },
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
    renderHeaderCell: () => {
      return "Delete";
    },
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
export function Confirm() {
  const [open, { toggle }] = useBoolean();

  return <>
    <Button appearance="primary" onClick={toggle} style={{ marginTop: tokens.spacingVerticalM }}>Checkout</Button>

    <Drawer
      open={open}
      onOpenChange={toggle}
      position="right"
      size="medium"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              onClick={toggle}
            />
          }
        >
          Confirm Order
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div style={{
          ...ColFlex,
          rowGap: tokens.spacingVerticalL
        }}>
          <div style={Flex}>
            <div style={{
              ...ColFlex,
              flexBasis: "50%",
              rowGap: tokens.spacingVerticalM
            }}>
              <Field label="Name" size="large">
                <Label>Aloento</Label>
              </Field>
            </div>

            <div style={{
              ...ColFlex,
              flexBasis: "50%",
              rowGap: tokens.spacingVerticalM
            }}>
              <Field label="Phone" size="large">
                <Label>Aloento</Label>
              </Field>
            </div>
          </div>

          <Field label="Address" size="large">
            <Label>Some Address Address Address Address Address Address Address</Label>
          </Field>

          <DataGrid
            items={items}
            columns={columns}
            getRowId={(item: ICartItem) => item.Id}
          >
            <DataGridHeader>
              <DataGridRow>
                {({ columnId, renderHeaderCell }) => (
                  <DataGridHeaderCell style={{
                    flexBasis: "unset",
                    flexGrow: columnId === "Product" ? 1 : 0
                  }}>
                    {renderHeaderCell()}
                  </DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>

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

          <Field label="Comment" size="large">
            <Textarea />
          </Field>

          <Button appearance="primary" style={{
            width: "fit-content",
            alignSelf: "flex-end"
          }}>
            Submit
          </Button>
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
