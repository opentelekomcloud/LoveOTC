import { Card, CardFooter, CardPreview, Link, Subtitle2, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { GuidImage } from "~/Helpers/GuidImage";
import { Logger } from "~/Helpers/Logger";
import { Cover } from "~/Helpers/Styles";
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
  }
});

const log = new Logger("Gallery", "Category", "Card");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.5
 */
export function GalleryCard({ Id }: { Id: number }) {
  const style = useStyles();
  const { data } = useRequest(() => Hub.Product.Get.Basic(Id, log), {
    onError: log.error
  });

  return (
    <Card className={style.card}>
      <CardPreview>
        <GuidImage className={style.img} Guid={data?.Cover} Log={log} />
      </CardPreview>

      <CardFooter>
        <Subtitle2>
          <Link href={`/Product/${Id}`}>{data?.Name || "Loading..."}</Link>
        </Subtitle2>
      </CardFooter>
    </Card>
  )
}
