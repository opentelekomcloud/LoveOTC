import { Button, Divider, Field, LargeTitle, SpinButton, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "~/Components/Router";
import { BaseCard, Col, ColFlex, Flex } from "~/Helpers/Styles";
import { Lexical } from "~/Lexical";
import { Hub } from "~/ShopNet";
import { IComboItem } from "../Admin/Product/Combo";
import { ProductCarousel } from "./Carousel";
import { ProductRadioList } from "./RadioGroup";
import demo from "./demo.json";

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
})

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IProduct {
  Name: string;
  Limit?: number;
  Combos: Omit<IComboItem, "Id">[];
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function Product() {
  const style = useStyle();
  const { Nav, Paths } = useRouter();
  const id = parseInt(Paths.at(1)!);

  const { data } = useRequest(Hub.Product.Get.Detail, {
    defaultParams: [id],
    onBefore() {
      isNaN(id) && Nav("/");
    },
    onError() {
      throw Nav("/");
    }
  });

  return (
    <div className={style.main}>
      <div className={style.info}>
        <ProductCarousel Id={id} />

        <div className={style.detail}>
          <LargeTitle className={style.fore}>
            {data?.Name}
          </LargeTitle>

          <Divider />

          <ProductRadioList Combos={data?.Combos} />

          <Divider />

          <div style={{
            ...ColFlex,
            rowGap: tokens.spacingVerticalS,
          }}>
            <Title3 className={style.fore}>
              QUANTITY
            </Title3>

            <div style={{
              ...Flex,
              justifyContent: "space-between",
              columnGap: tokens.spacingHorizontalM
            }}>
              <Field>
                <SpinButton appearance="underline" defaultValue={1} min={1} max={data?.Limit} />
              </Field>

              <Button appearance="primary">ADD TO CART</Button>
            </div>
          </div>

        </div>
      </div>

      <div style={{
        ...BaseCard,
        padding: tokens.spacingHorizontalXL
      }}>
        <Lexical Display State={JSON.stringify(demo.editorState)} />
      </div>
    </div>
  )
}
