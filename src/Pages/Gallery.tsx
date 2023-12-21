import { Body1, Card, CardFooter, CardPreview, Link, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { random } from "lodash-es";
import { GuidImage } from "~/Helpers/GuidImage";
import { Logger } from "~/Helpers/Logger";
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

const log1 = new Logger("Gallery");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.3
 */
export function Gallery() {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Gallery.Get.Categories(), {
    onError: log1.error
  });

  return (
    <div className={style.main}>
      {
        data?.map((x, i) => <GalleryCategory key={i} Category={x} />)
      }
    </div>
  )
}

const log2 = log1.With("Category");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.3
 */
function GalleryCategory({ Category }: { Category: string }) {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Gallery.Get.Products(Category), {
    onError: log2.error
  });
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

const log3 = log2.With("Card");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.3
 */
function GalleryCard({ Id }: { Id: number }) {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Product.Get.Basic(Id, log3), {
    onError: log3.error
  });

  return (
    <Card className={style.card}>
      <CardPreview>
        <GuidImage className={style.img} Guid={data?.Cover} Log={log3} />
      </CardPreview>

      <CardFooter>
        <Body1>
          <Link href={`/Product/${Id}`}>{data?.Name}</Link>
        </Body1>
      </CardFooter>
    </Card>
  )
}
