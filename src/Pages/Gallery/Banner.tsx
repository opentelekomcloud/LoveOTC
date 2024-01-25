import { Button, Card, CardHeader, CardPreview, Divider, Image, Text, makeStyles, tokens } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { Cover } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
const useStyles = makeStyles({
  main: {
    alignItems: "flex-start",
    columnGap: tokens.spacingHorizontalXXL
  },
  img: {
    ...Cover,
    aspectRatio: "16/9",
  },
  txt: {
    flexBasis: 0
  },
  prev: {
    flexBasis: "46%"
  }
});

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.2.0
 */
export function Banner() {
  const style = useStyles();
  const [close, { setTrue }] = useBoolean();

  if (close)
    return null;

  return <>
    <Card orientation="horizontal" size="large" className={style.main}>
      <CardPreview
        className={style.prev}
        logo={<Button appearance="subtle" icon={<DismissRegular />} onClick={setTrue} />}
      >
        <Image className={style.img} src="/banner.jpg" />
      </CardPreview>

      <CardHeader
        className={style.txt}
        header={
          <Text size={500}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non magna nisi.
            Nunc ut est vel est sodales consequat. Vivamus imperdiet eros luctus, mollis lorem quis, elementum arcu.
            Ut maximus pharetra volutpat. Etiam lorem risus, pellentesque vitae malesuada vitae, sollicitudin in massa.
            In nunc nulla, pretium vitae risus in, pulvinar bibendum magna. Duis ornare ullamcorper neque, sed venenatis augue.
            Vestibulum rutrum sapien et purus condimentum, id ultricies lectus hendrerit.
            <br />
            Aenean porttitor, metus ac semper malesuada, nulla leo dapibus dolor, et gravida augue leo ut sem.
            Morbi vitae ipsum viverra, suscipit turpis a, elementum mi.
            Cras pharetra ipsum leo, nec rhoncus elit cursus ut.
            Fusce consectetur lacus quis odio molestie, nec sollicitudin est pretium. Donec cursus sollicitudin porta.
            Integer tellus mi, iaculis ut massa et, tempor placerat odio. Quisque ac interdum mauris, ac scelerisque odio.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          </Text>
        }
      />
    </Card>

    <Divider />
  </>;
}
