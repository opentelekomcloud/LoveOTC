import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Divider, Image, LargeTitle, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRefEffect } from "@fluentui/react-hooks";
import Typed from "typed.js";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
const useStyles = makeStyles({
  main: {
    position: "relative"
  },
  img: {
    ...Cover,
    aspectRatio: "42/9",
    width: "100%",
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "4px",
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    backdropFilter: "blur(1px) brightness(105%)",
  },
  info: {
    ...Flex,
    position: "absolute",
    top: 0,
    ...shorthands.padding(tokens.spacingHorizontalXXXL),
    height: "-webkit-fill-available",
  },
  space: {
    flexBasis: "50%",
    flexShrink: 0
  },
  txt: {
    ...ColFlex,
    justifyContent: "space-around"
  },
  white: {
    color: "white !important"
  }
});

/**
 * @author Aloento
 * @since 1.3.5
 * @version 1.5.0
 */
export function Banner() {
  const style = useStyles();

  const ref = useRefEffect<HTMLSpanElement>((el) => {
    const typed = new Typed(el, {
      strings: ["Performance", "Safe", "World", "Love"],
      typeSpeed: 60,
      backSpeed: 40,
      startDelay: 1500,
      backDelay: 3000,
      showCursor: false,
    });

    return () => typed.destroy();
  });

  return <>
    <div className={style.main}>
      <Image className={style.img} src="/banner.jpg" />
      <div className={style.mask} style={{
        background: 'linear-gradient(to right, transparent, var(--colorBackgroundOverlay))',
      }} />

      <div className={style.info}>
        <div className={style.space} />

        <div className={style.txt}>
          <div>
            <LargeTitle className={style.white}>
              Play&nbsp;
            </LargeTitle>

            <Text
              ref={ref}
              size={900}
              weight="semibold"
              underline
              className={style.white}
            >
              ?
            </Text>

            <LargeTitle className={style.white}>
              &nbsp;With Open Telekom Cloud
            </LargeTitle>
          </div>

          <Text size={500} className={style.white}>
            We offer an exclusive chance for OTC tribe members to get up to three fashion items until February 29, 2024.
            Members can log in using their OTC-LDAP account, update their delivery address in the "Settings," and shop for their preferred styles.
            After selecting items and sizes, confirm and submit their order and address.
            Orders are expected to arrive within 10-14 days.
          </Text>

          <Dialog modalType="non-modal">
            <DialogTrigger disableButtonEnhancement>
              <div>
                <Button appearance="outline" size="large" className={style.white}>
                  Learn More
                </Button>
              </div>
            </DialogTrigger>

            <DialogSurface>
              <DialogBody>
                <DialogTitle>Welcome to LoveOTC Shop</DialogTitle>

                <DialogContent>
                  <Text size={400}>
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
                    Review your entire order, confirm your delivery address, and feel free to leave a note.
                    Ready? Click "Submit" for a confirmation. Now, you can either close the shop or keep browsing.
                    Expect your stylish delivery in 10-14 days. Happy shopping, OTC trendsetters!
                  </Text>
                </DialogContent>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </div>
      </div>
    </div>

    <Divider />
  </>;
}
