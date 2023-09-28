import { Divider, LargeTitle, SpinButton, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "~/Components/Router";
import { BaseCard, Col, ColFlex, Flex } from "~/Helpers/Styles";
import { useLimit } from "~/Helpers/useLimit";
import { Hub } from "~/ShopNet";
import { IComboItem } from "../Admin/Product/Combo";
import { ProductAddCart } from "./AddCart";
import { ProductCarousel } from "./Carousel";
import { RadioGroupContext } from "./Context";
import { ProductLexicalRender } from "./Lexical";
import { ProductRadioList } from "./RadioGroup";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  main: ColFlex,
  info: {
    ...Flex,
    columnGap: tokens.spacingHorizontalXXXL
  },
  detail: {
    ...BaseCard,
    ...Col,
    height: "fit-content",
    flexBasis: "50%",
    flexShrink: 0,
    rowGap: tokens.spacingVerticalXL,
    paddingTop: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingHorizontalXXL
  },
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
})

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IProduct {
  Name: string;
  Combos: Omit<IComboItem, "Id">[];
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.3
 */
export function Product() {
  const style = useStyle();
  const { Nav, Paths } = useRouter();
  const id = parseInt(Paths.at(1)!);

  const { data } = useRequest(Hub.Product.Get.Basic, {
    defaultParams: [id],
    onBefore() {
      isNaN(id) && Nav("/");
    },
    onError() {
      throw Nav("/");
    }
  });

  const [_, max] = useLimit(id);
  const [quantity, setQuantity] = useState(1);

  return (
    <RadioGroupContext>
      <div className={style.main}>
        <div className={style.info}>
          <ProductCarousel Id={id} />

          <div className={style.detail}>
            <LargeTitle className={style.fore}>
              {data?.Name}
            </LargeTitle>

            <Divider />

            <ProductRadioList ProdId={id} />

            <Divider />

            <div className={style.quan}>
              <Title3 className={style.fore}>
                QUANTITY
              </Title3>

              <div className={style.add}>
                <SpinButton
                  appearance="underline"
                  value={quantity}
                  min={1}
                  max={max}
                  onChange={(_, val) => setQuantity(val.value!)}
                />

                <ProductAddCart
                  ProdId={id}
                  Quantity={quantity}
                />
              </div>
            </div>

          </div>
        </div>

        <ProductLexicalRender ProdId={id} />
      </div>
    </RadioGroupContext>
  )
}
