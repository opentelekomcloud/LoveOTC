import { Body1, Popover, PopoverSurface, PopoverTrigger, ToggleButton, Tooltip, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { CartRegular } from "@fluentui/react-icons";
import { useBoolean, useUpdateEffect } from "ahooks";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { DelegateDataGrid } from "../DataGrid/Delegate";
import { CartColumns } from "./Columns";
import { Confirm } from "./Confirm";
import { useShopCart } from "./Context";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  conf: {
    ...Flex,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalL
  },
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.borderRadius(tokens.borderRadiusCircular)
  },
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface ICartItem {
  Id: number;
  ProdId: number;
  Cover: string;
  Name: string;
  Type: Record<string, string>;
  Quantity: number;
}

const log = new Logger("TopNavBar", "ShopCart");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.2
 */
export function ShopCart() {
  const [open, { toggle }] = useBoolean();
  const [visi, { toggle: toggleVisi }] = useBoolean();

  const style = useStyles();
  const { List } = useShopCart();

  useUpdateEffect(() => {
    if (open) return;

    toggleVisi();
    const i = setTimeout(toggleVisi, 2000);

    return () => clearTimeout(i);
  }, [List]);

  return (
    <Popover withArrow open={open} onOpenChange={toggle}>
      <PopoverTrigger disableButtonEnhancement>
        <Tooltip
          visible={visi}
          withArrow
          content={{
            children: "↑",
            className: style.tooltip
          }}
          relationship="inaccessible"
        >
          <ToggleButton icon={<CartRegular />} appearance="subtle" size="large" checked={open} />
        </Tooltip>
      </PopoverTrigger>

      <PopoverSurface>
        <DelegateDataGrid Items={List} Columns={useConst(() => CartColumns(log))} NoHeader />

        <div className={style.conf}>
          <Body1>
            {List.map(x => x.Quantity).reduce((prev, curr) => prev + curr, 0)} items in shopping cart
          </Body1>

          <Confirm />
        </div>
      </PopoverSurface>
    </Popover>
  )
}
