import { Button, Divider, Field, LargeTitle, SpinButton, Title3, ToggleButton, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BaseCard, Col, ColFlex, Cover, Flex } from "~/Helpers/Styles";
import { Lexical } from "~/Lexical";
import demo from "./demo.json";

const useStyle = makeStyles({
  img: {
    aspectRatio: "1",
    ...Cover,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  }
})

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function Product() {
  const style = useStyle();

  return (
    <div style={ColFlex}>
      <div style={{
        ...Flex,
        columnGap: tokens.spacingHorizontalXXXL
      }}>
        <Carousel showArrows>
          <img className={style.img} src="https://picsum.photos/550" />
          <img className={style.img} src="https://picsum.photos/650" />
          <img className={style.img} src="https://picsum.photos/500" />
          <img className={style.img} src="https://picsum.photos/600" />
          <img className={style.img} src="https://picsum.photos/700" />
          <img className={style.img} src="https://source.unsplash.com/random" />
        </Carousel>

        <div style={{
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
        }}>
          <LargeTitle style={{
            color: tokens.colorBrandForeground1
          }}>
            OTC SHIRT - GREY
          </LargeTitle>

          <Divider />

          <div style={{
            ...ColFlex,
            rowGap: tokens.spacingVerticalM,
          }}>
            <Title3 style={{
              color: tokens.colorBrandForeground1
            }}>
              SELECT SLEEVE: SHORT SLEEVE
            </Title3>

            <div style={{
              ...Flex,
              flexWrap: "wrap",
              rowGap: tokens.spacingHorizontalS,
              columnGap: tokens.spacingHorizontalM
            }}>
              <ToggleButton appearance="outline" checked style={{ borderColor: tokens.colorBrandForeground1 }}>Short Sleeve</ToggleButton>
              <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>Short Sleeve</ToggleButton>
            </div>
          </div>

          <div style={{
            ...ColFlex,
            rowGap: tokens.spacingVerticalS,
          }}>
            <Title3 style={{
              color: tokens.colorBrandForeground1
            }}>
              SELECT SIZE: SMALL
            </Title3>

            <div style={{
              ...Flex,
              flexWrap: "wrap",
              rowGap: tokens.spacingHorizontalS,
              columnGap: tokens.spacingHorizontalM
            }}>
              <ToggleButton appearance="outline" checked style={{ borderColor: tokens.colorBrandForeground1 }}>S</ToggleButton>
              <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>M</ToggleButton>
              <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>L</ToggleButton>
              <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>XL</ToggleButton>
              <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>XXL</ToggleButton>
              <ToggleButton appearance="outline" style={{ borderColor: tokens.colorBrandForeground1 }}>XXXL</ToggleButton>
            </div>
          </div>

          <Divider />

          <div style={{
            ...ColFlex,
            rowGap: tokens.spacingVerticalS,
          }}>
            <Title3 style={{
              color: tokens.colorBrandForeground1
            }}>
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
