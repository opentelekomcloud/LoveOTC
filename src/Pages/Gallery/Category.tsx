import { SkeletonItem, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { random } from "lodash-es";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { GalleryCard } from "./Card";

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
  cate: {
    ...Flex,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    columnGap: tokens.spacingVerticalL,
    rowGap: tokens.spacingVerticalXL
  }
});

const log = new Logger("Gallery", "Category");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.4
 */
export function GalleryCategory({ Category }: { Category: string }) {
  const style = useStyles();
  const { data, loading } = useRequest(() => Hub.Gallery.Get.Products(Category), {
    onError: log.error
  });

  return <>
    <Title3>{Category}</Title3>

    <div className={style.cate}>
      {
        loading
          ? <SkeletonItem size={128} />
          : data![0].map((x, i) => <GalleryCard key={i} Id={x} />)
            .concat(
              Array(data![1]).fill(null)
                .map((_, i) => <div key={i + random(10, 100)} className={style.card} />)
            )
      }
    </div>
  </>
}
