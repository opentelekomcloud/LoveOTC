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
  },
  space: {
    flexBasis: "50%",
    flexShrink: 0
  },
  txt: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalXL,
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
      strings: ["AwaiShop", "Together", "Dream", "Forever"],
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
              &nbsp;With SoarCraft
            </LargeTitle>
          </div>

          <Text size={500} className={style.white}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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

                <DialogTitle>Welcome to AwaiShop</DialogTitle>

                <DialogContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nec erat vel hendrerit.
                  Nulla tempus placerat turpis dictum placerat. Suspendisse ut justo diam.
                  Donec auctor augue feugiat purus mollis, vitae congue erat pretium. Nulla blandit orci ante, a posuere mauris eleifend vel.
                  Nam dapibus venenatis scelerisque. Nullam nisl turpis, cursus in convallis in, eleifend eget arcu.
                  Curabitur scelerisque pretium turpis, consectetur congue nulla convallis tincidunt.
                  Quisque rhoncus lectus a nunc tempor scelerisque. Quisque non augue eget augue ultricies viverra.
                  Maecenas aliquam nisi orci, id volutpat risus efficitur et. Aliquam ac nunc euismod, interdum mi ac, faucibus enim.
                  Donec nec finibus metus. Phasellus iaculis elit finibus sem aliquam, ut viverra tortor dapibus.
                  Phasellus rhoncus, libero sit amet pulvinar tempus, velit lorem venenatis nisi, id ornare quam quam eget orci. In hac habitasse platea dictumst.
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
