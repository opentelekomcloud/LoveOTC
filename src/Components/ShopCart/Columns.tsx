import { Body1Strong, Button, Caption1, DataGridCell, Link, SpinButton, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ICartItem, useStyles } from ".";
import { useShopCart } from "./Context";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
export const CartColumns: TableColumnDefinition<ICartItem>[] = [
  MakeCoverCol(44),
  createTableColumn<ICartItem>({
    columnId: "Product",
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().prod}>
          <Link href={`/Product/${item.ProdId}`} appearance="subtle">
            <Body1Strong>{item.Name}</Body1Strong>
          </Link>

          <Caption1>{item.Type.reduce((prev, curr) => `${prev} ${curr.Type},`, "")}</Caption1>
        </DataGridCell>
      );
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Quantity",
    renderCell(item) {
      const { List, Update } = useShopCart();

      return (
        <DataGridCell className={useStyles().qua}>
          <SpinButton
            defaultValue={item.Quantity}
            min={1}
            max={3}
            onChange={(_, v) => {
              const i = List.findIndex(x => x.Id === item.Id);
              List[i] = {
                ...item,
                Quantity: v.value!
              };

              Update(List);
            }} />
        </DataGridCell>
      );
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Action",
    renderCell(item) {
      const { List, Update } = useShopCart();

      return (
        <DataGridCell className={useStyles().act}>
          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
            onClick={() => {
              Update(List.filter(x => x.Id !== item.Id));
            }} />
        </DataGridCell>
      );
    },
  })
];
