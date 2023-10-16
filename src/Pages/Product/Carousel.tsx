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
 * @version 0.2.2
 */
export function ProductCarousel({ Id }: { Id: number; }) {
  const style = useStyle();
  const [imgs, setImgs] = useState<string[]>(["https://placehold.co/400?text=Loading..."]);

  useRequest(Hub.Product.Get.Carousel.bind(Hub.Product.Get), {
    defaultParams: [Id],
    async onSuccess(data) {
      setImgs(Array<string>(data.length).fill("https://placehold.co/400?text=Loading..."));

      for (let i = 0; i < data.length; i++) {
        const e = data[i];

        Hub.Storage.GetBySlice(e.Cover).then(slice => {
          setImgs(x => {
            const n = [...x];
            n[i] = URL.createObjectURL(new Blob(slice));
            return n;
          });
        });
      }
    },
  });

  return (
    <Carousel showArrows>
      {imgs?.map((x, i) => <img key={i} className={style.img} src={x} />)}
    </Carousel>
  );
}
