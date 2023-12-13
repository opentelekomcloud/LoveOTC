import { Body1, Card, CardFooter, CardPreview, Link, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { random } from "lodash-es";
import { GuidImage } from "~/Helpers/GuidImage";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";

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
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
  },
  cate: {
    ...Flex,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    columnGap: tokens.spacingVerticalL,
    rowGap: tokens.spacingVerticalXL
  },
  main: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalXL
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface IProductInfo {
  Cover: string;
  Name: string;
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.2
 */
export function Gallery() {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Gallery.Get.Categories());

  return (
    <div className={style.main}>
      {
        data?.map((x, i) => <GalleryCategory key={i} Category={x} />)
      }
    </div>
  )
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.2
 */
function GalleryCategory({ Category }: { Category: string }) {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Gallery.Get.Products(Category));
  const list = data || [[], 0];

  return <>
    <Title3>{Category}</Title3>

    <div className={style.cate}>
      {
        list[0].map((x, i) => <GalleryCard key={i} Id={x} />)
          .concat(
            Array(list[1]).fill(null)
              .map((_, i) => <div key={i + random(10, 100)} className={style.card} />)
          )
      }
    </div>
  </>
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.2
 */
function GalleryCard({ Id }: { Id: number }) {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Product.Get.Basic(Id));

  return (
    <Card className={style.card}>
      <CardPreview>
        <GuidImage className={style.img} Guid={data?.Cover} />
      </CardPreview>

      <CardFooter>
        <Body1>
          <Link href={`/Product/${Id}`}>{data?.Name}</Link>
        </Body1>
      </CardFooter>
    </Card>
  )
}
