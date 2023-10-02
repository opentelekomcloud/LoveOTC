import { Body1Strong, Button, Caption1, DataGridCell, Link, SpinButton, TableColumnDefinition, createTableColumn, makeStyles } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { ColFlex } from "~/Helpers/Styles";
import { useLimit } from "~/Helpers/useLimit";
import { ICartItem } from ".";
import { useShopCart } from "./Context";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  prod: {
    ...ColFlex,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  qua: {
    flexBasis: "12%",
    flexGrow: 0
  },
  act: {
    flexBasis: "7%",
    flexGrow: 0
  },
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.1
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

          <Caption1>{Object.values(item.Type).reduce((prev, curr) => `${prev} ${curr},`, "")}</Caption1>
        </DataGridCell>
      );
    }
  }),
  createTableColumn<ICartItem>({
    columnId: "Quantity",
    renderCell(item) {
      const { List, Update } = useShopCart();
      const [dis, max] = useLimit(item.ProdId);

      return (
        <DataGridCell className={useStyles().qua}>
          <SpinButton
            min={1}
            max={max}
            value={item.Quantity}
            onChange={(_, v) => {
              if (dis && v.value! >= item.Quantity)
                return;

              item.Quantity = v.value!;
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
