import { SkeletonItem, Title3, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { GalleryCard } from "./Card";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
const useStyles = makeStyles({
  card: {
    flexBasis: "20%",
    flexGrow: 1,
    flexShrink: 0,
    maxWidth: "25%",
    minWidth: `${375 / 2}px`,
    boxSizing: "border-box",
    paddingRight: tokens.spacingHorizontalL,
    paddingLeft: tokens.spacingHorizontalL,
  },
  cate: {
    ...Flex,
    flexWrap: "wrap",
    rowGap: tokens.spacingVerticalXL
  }
});

const log = new Logger("Gallery", "Category");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.5
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
          : data!.map((x, i) => (
            <div className={style.card}>
              <GalleryCard key={i} Id={x} />
            </div>
          ))
      }
    </div>
  </>
}
