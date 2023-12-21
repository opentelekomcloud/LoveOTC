import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Logger } from "~/Helpers/Logger";
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

const img = "https://placehold.co/400?text=Loading...";

const log = new Logger("Product", "Carousel");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.3
 */
export function ProductCarousel({ Id }: { Id: number; }) {
  const style = useStyle();
  const [imgs, setImgs] = useState<string[]>([img]);

  useRequest(() => Hub.Product.Get.Carousel(Id, log), {
    async onSuccess(data) {
      setImgs(Array<string>(data.length).fill(img));

      for (let i = 0; i < data.length; i++) {
        Hub.Storage.GetBySlice(data[i].Cover, log).then(slice => {
          setImgs(x => {
            const n = [...x];
            n[i] = URL.createObjectURL(new Blob(slice));
            return n;
          });
        });
      }
    },
    onError: log.error
  });

  return (
    <Carousel showArrows>
      {imgs?.map((x, i) => <img key={i} className={style.img} src={x} />)}
    </Carousel>
  );
}
