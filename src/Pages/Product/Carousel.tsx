import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
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
 * @version 0.2.0
 */
export function ProductCarousel({ Id }: { Id: number; }) {
  const style = useStyle();
  const [imgs, setImgs] = useState<string[]>([]);

  useRequest(Hub.Product.Get.Carousel.bind(Hub.Product.Get), {
    defaultParams: [Id],
    async onSuccess(data) {
      for (const i of data) {
        const slice: Uint8Array[] = [];

        Hub.Storage.Get(i.Cover).then(x =>
          x.subscribe({
            error(err) {
              throw err;
            },
            next(value) {
              slice.push(value);
            },
            complete() {
              const blob = new Blob(slice);
              const url = URL.createObjectURL(blob);
              setImgs(x => [...x, url]);
            },
          })
        );
      }
    },
  });

  return (
    <Carousel showArrows>
      {imgs?.map((x, i) => <img key={i} className={style.img} src={x} />)}
    </Carousel>
  );
}
