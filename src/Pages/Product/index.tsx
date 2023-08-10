import { makeStyles, tokens } from "@fluentui/react-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BaseCard, ColFlex, Cover, Flex } from "~/Helpers/Styles";
import { Lexical } from "~/Lexical";

const useStyle = makeStyles({
  img: {
    aspectRatio: "1",
    ...Cover,
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
    <div style={{
      ...ColFlex,
      rowGap: tokens.spacingVerticalXXL
    }}>
      <div style={{
        ...Flex,
        columnGap: tokens.spacingHorizontalXXL
      }}>
        <Carousel showArrows>
          <img className={style.img} src="https://picsum.photos/1000/800" />
          <img className={style.img} src="https://picsum.photos/800/1000" />
        </Carousel>

        <div style={{
          ...BaseCard,
          flexBasis: `${100 / 1.732}%`,
          flexShrink: 0
        }}>

        </div>
      </div>

      <Lexical />
    </div>
  )
}
