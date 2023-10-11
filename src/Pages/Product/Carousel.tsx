import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { Carousel } from "react-responsive-carousel";
import { Cover } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  img: {
    aspectRatio: "1",
    ...Cover,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function ProductCarousel({ Id }: { Id: number; }) {
  const style = useStyle();
  const { data } = useRequest(Hub.Product.Get.Carousel.bind(Hub.Product.Get), {
    defaultParams: [Id]
  });

  return (
    <Carousel showArrows>
      {data?.map((val, i) => <img key={i} className={style.img} src={val.Cover} />)}
    </Carousel>
  );
}
