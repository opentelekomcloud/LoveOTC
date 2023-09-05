import { Button, Divider, Field, LargeTitle, SpinButton, Title3, ToggleButton, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "~/Components/Router";
import { BaseCard, Col, ColFlex, Cover, Flex } from "~/Helpers/Styles";
import { Lexical } from "~/Lexical";
import { Hub } from "~/ShopNet";
import { IComboItem } from "../Admin/Product/Combo";
import demo from "./demo.json";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  main: ColFlex,
  img: {
    aspectRatio: "1",
    ...Cover,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  },
  fore: {
    color: tokens.colorBrandForeground1
  },
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
  vari: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalS,
  },
  radio: {
    ...Flex,
    flexWrap: "wrap",
    rowGap: tokens.spacingHorizontalS,
    columnGap: tokens.spacingHorizontalM
  }
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

  const { data, loading } = useRequest<[IProduct, Record<string, Set<string>>], never>(async () => {
    if (isNaN(id))
      throw null;

    const raw = await Hub.Product.Get.Detail(id);
    const variant: Record<string, Set<string>> = {};

    for (const i of raw.Combos) {
      for (const c of i.Combo) {
        if (variant.hasOwnProperty(c.Variant))
          variant[c.Variant].add(c.Type);
        else
          variant[c.Variant] = new Set([c.Type]);
      }
    }

    return [raw, variant];
  }, {
    onError() {
      throw Nav("/");
    }
  });

  return (
    <div className={style.main}>
      <div className={style.info}>
        <Gallery Id={id} />

        <div className={style.detail}>
          <LargeTitle className={style.fore}>
            OTC SHIRT - GREY
          </LargeTitle>

          <Divider />

          <Radio />

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
                <SpinButton appearance="underline" defaultValue={1} />
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

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
function Radio() {
  const style = useStyle();
  const [curr, setCurr] = useState<number>();

  return (
    <div className={style.vari}>
      <Title3 className={style.fore}>
        SELECT SLEEVE: SHORT SLEEVE
      </Title3>

      <div className={style.radio}>
        <ToggleButton appearance="outline" checked style={{ borderColor: tokens.colorBrandForeground1 }}>Short Sleeve</ToggleButton>
        <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>Long Sleeve</ToggleButton>
      </div>
    </div>
  );
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
function Gallery({ Id }: { Id: number }) {
  const style = useStyle();
  const { data, loading } = useRequest(() => Hub.Product.Get.Carousel(Id));

  return (
    <Carousel showArrows>
      <img className={style.img} src="https://picsum.photos/550" />
      <img className={style.img} src="https://picsum.photos/650" />
      <img className={style.img} src="https://picsum.photos/500" />
      <img className={style.img} src="https://picsum.photos/600" />
      <img className={style.img} src="https://picsum.photos/700" />
      <img className={style.img} src="https://source.unsplash.com/random" />
    </Carousel>
  );
}
