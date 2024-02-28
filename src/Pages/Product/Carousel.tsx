import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Logger } from "~/Helpers/Logger";
import { Cover } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  img: {
    aspectRatio: "1",
    ...Cover,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  },
});

const img = "https://placehold.co/1000?text=Loading...";

const log = new Logger("Product", "Carousel");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.4.0
 */
export function ProductCarousel({ Id }: { Id: number; }) {
  const style = useStyles();
  const [imgs, setImgs] = useState<[string, string?][]>([[img]]);

  const { data } = Hub.Product.Get.usePhotoList(Id, log);
  const list = data ? data[0] : undefined;

  useAsyncEffect(async () => {
    if (!list) return;

    setImgs(Array<[string, string?]>(list.length).fill([img]));

    for (let i = 0; i < list.length; i++)
      Hub.Storage.GetBySlice(list[i].ObjectId, log).then(slice => {
        setImgs(x => {
          const n = [...x];
          n[i] = [URL.createObjectURL(new Blob(slice)), list[i].Caption];
          return n;
        });
      });
  }, [list]);

  return (
    <Carousel showArrows>
      {imgs.map((x, i) => (
        <div key={i}>
          <img className={style.img} src={x[0]} />
          {x[1] && <p className="legend">{x[1]}</p>}
        </div>
      ))}
    </Carousel>
  );
}
