import { SpinButton, Subtitle1, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useState } from "react";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { useLimit } from "~/Helpers/useLimit";
import { ProductAddCart } from "./AddCart";
import { useRadioGroup } from "./Context";

/**
 * @author Aloento
 * @since 1.2.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  fore: {
    color: tokens.colorBrandForeground1
  },
  quan: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalS,
  },
  add: {
    ...Flex,
    justifyContent: "space-between",
    columnGap: tokens.spacingHorizontalM
  },
  stock: {
    ...Flex,
    justifyContent: "space-between",
  }
})

/**
 * @author Aloento
 * @since 1.2.0
 * @version 0.2.0
 */
export function ProductQuantity({ Id }: { Id: number; }) {
  const style = useStyle();
  const { Combo } = useRadioGroup();

  const [_, max] = useLimit(Id);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={style.quan}>
      <div className={style.stock}>
        <Title3 className={style.fore}>
          QUANTITY
        </Title3>

        <Subtitle1 className={style.fore}>
          {Combo?.Stock || 0} in stock
        </Subtitle1>
      </div>


      <div className={style.add}>
        <SpinButton
          appearance="underline"
          value={quantity}
          min={1}
          max={max}
          disabled={!Combo?.Stock}
          onChange={(_, val) => setQuantity(val.value!)}
        />

        <ProductAddCart
          ProdId={Id}
          Quantity={quantity}
        />
      </div>
    </div>
  )
}
