import { Body1, Card, CardFooter, CardPreview, Image, Title3, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  card: {
    flexBasis: "23%",
    flexGrow: 0,
  },
  img: {
    aspectRatio: "1",
    ...Cover,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  },
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface ProductInfo {
  Image: string;
  Name: string;
}

const cardList: ProductInfo[] = [
  {
    Image: "https://source.unsplash.com/random",
    Name: "Product 1"
  },
  {
    Image: "https://source.unsplash.com/random",
    Name: "Product 2"
  },
  {
    Image: "https://source.unsplash.com/random",
    Name: "Product 3"
  },
  {
    Image: "https://source.unsplash.com/random",
    Name: "Product 4"
  }
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function Gallery() {
  const style = useStyles();

  return (
    <div style={{
      ...ColFlex,
      rowGap: tokens.spacingVerticalXL
    }}>
      <Title3>T-Shirt</Title3>

      <div style={{
        ...Flex,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        columnGap: tokens.spacingVerticalL,
        rowGap: tokens.spacingVerticalXL
      }}>
        {
          cardList.map((item) => (
            <Card className={style.card}>
              <CardPreview>
                <Image className={style.img} src={item.Image} />
              </CardPreview>

              <CardFooter>
                <Body1>
                  {item.Name}
                </Body1>
              </CardFooter>
            </Card>
          ))
        }
      </div>

      <Title3>Cap</Title3>
    </div>
  )
}
