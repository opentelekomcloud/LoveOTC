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
 * @version 0.2.1
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
            Open Telekom Cloud is envisioned, run, and nurtured by a unique and dynamic team of experts committed to sovereignty and open-source innovation:
            The OTC tribe! To showcase your connection and #werkstolz,
            we're thrilled to offer our tribe members an exclusive chance to snag up to three fashion items as a token of appreciation.
            Hurry, this offer is only open until February 29, 2024!
            <br /><br />
            To start shopping, simply log in with your OTC-LDAP account in the top right corner.
            Don't forget to update your delivery address for a seamless experience – just click on your profile avatar and head to "Settings."
            Rest assured, we only keep your personal data until your awesome items reach your doorstep.
            <br /><br />
            Found your style in the shop? Double-check your selections in the cart – sizes, variants, quantities – and when everything's perfect, hit "Checkout."
            Review your entire order, confirm your delivery address, and feel free to leave a note. Ready? Click "Submit" for a confirmation.
            Now, you can either close the shop or keep browsing. Expect your stylish delivery in 10-14 days. Happy shopping, OTC trendsetters!
          </Text>
        }
      />
    </Card>

    <Divider />
  </>;
}
