import { Body1, Popover, PopoverSurface, PopoverTrigger, ToggleButton, makeStyles, tokens } from "@fluentui/react-components";
import { CartRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { DelegateDataGrid } from "../DelegateDataGrid";
import { CartColumns } from "./Columns";
import { Confirm } from "./Confirm";
import { useShopCart } from "./Context";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const useStyles = makeStyles({
  prod: {
    ...ColFlex,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  qua: {
    flexBasis: "10%",
    flexGrow: 0
  },
  act: {
    flexBasis: "7%",
    flexGrow: 0
  },
  conf: {
    ...Flex,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalL
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface ICartItem {
  Id: number;
  ProdId: number;
  Image: string;
  Name: string;
  Type: string[];
  Quantity: number;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.1
 */
export function ShopCart() {
  const [open, { toggle }] = useBoolean();
  const style = useStyles();
  const { List } = useShopCart();

  return (
    <Popover withArrow open={open} onOpenChange={toggle}>
      <PopoverTrigger disableButtonEnhancement>
        <ToggleButton icon={<CartRegular />} appearance="subtle" size="large" checked={open} />
      </PopoverTrigger>

      <PopoverSurface className={style.prod}>
        <DelegateDataGrid Items={List} Columns={CartColumns} NoHeader />

        <div className={style.conf}>
          <Body1>{List.map(x => x.Quantity).reduce((prev, curr) => prev + curr, 0)} items in shopping cart</Body1>

          <Confirm />
        </div>
      </PopoverSurface>
    </Popover>
  )
}
