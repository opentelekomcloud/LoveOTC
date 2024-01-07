import { Divider, LargeTitle, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { Helmet } from "react-helmet";
import { useRouter } from "~/Components/Router";
import { Dic } from "~/Helpers/Dic";
import { Logger } from "~/Helpers/Logger";
import { BaseCard, Col, ColFlex, Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { IComboItem } from "../Admin/Product/Combo";
import { ProductCarousel } from "./Carousel";
import { RadioGroupContext } from "./Context";
import { ProductQuantity } from "./Quantity";
import { ProductRadioList } from "./RadioList";

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
  }
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

const log = new Logger("Product");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
function Product() {
  const style = useStyle();
  const { Nav, Paths } = useRouter();
  const id = parseInt(Paths.at(1)!);

  const { data } = useRequest(() => Hub.Product.Get.Basic(id, log), {
    onBefore() {
      isNaN(id) && Nav("/");
    },
    onError(e) {
      Nav("/");
      log.error(e);
    }
  });

  return (
    <RadioGroupContext>
      <Helmet>
        <title>{data?.Name || ""} - {Dic.Name}</title>
      </Helmet>

      <div className={style.main}>
        <div className={style.info}>
          <ProductCarousel Id={id} />

          <div className={style.detail}>
            <LargeTitle className={style.fore}>
              {data?.Name || "Loading..."}
            </LargeTitle>

            <Divider />

            <ProductRadioList ProdId={id} />

            <Divider />

            <ProductQuantity Id={id} />
          </div>
        </div>

        {/* <ProductLexicalRender ProdId={id} /> */}
      </div>
    </RadioGroupContext>
  )
}

/** @deprecated */
export default Product;
