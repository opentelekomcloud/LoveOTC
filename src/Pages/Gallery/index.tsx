import { Skeleton, SkeletonItem, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { Helmet } from "react-helmet";
import { Dic } from "~/Helpers/Dic";
import { Logger } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { Banner } from "./Banner";
import { GalleryCategory } from "./Category";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
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
export interface IGallery {
  Cover: string;
  Name: string;
}

const log = new Logger("Gallery");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
function Gallery() {
  const style = useStyles();
  const { data, loading } = useRequest(() => Hub.Gallery.Get.Categories(), {
    onError: log.error
  });

  if (loading)
    return (
      <Skeleton className={style.main}>
        <Banner />
        <SkeletonItem appearance="translucent" size={32} />
        <SkeletonItem size={128} />
      </Skeleton>
    );

  return (
    <div className={style.main}>
      <Helmet>
        <title>Gallery - {Dic.Name}</title>
      </Helmet>

      <Banner />

      {
        data?.map((x, i) => <GalleryCategory key={i} Category={x} />)
      }
    </div>
  )
}

/** @deprecated */
export default Gallery;
