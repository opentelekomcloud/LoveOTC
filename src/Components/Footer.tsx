import { Image, Link, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { ColFlex, Flex, NavW } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.2
 */
const useStyles = makeStyles({
  box: {
    width: "-webkit-fill-available",
    marginTop: tokens.spacingVerticalXXXL,
    ...shorthands.padding(tokens.spacingVerticalXXL, 0),
    backgroundColor: tokens.colorNeutralBackgroundStatic
  },
  main: {
    ...Flex,
    maxWidth: NavW,
    ...shorthands.margin(0, "auto"),
    justifyContent: "space-between",
    alignItems: "center"
  },
  white: {
    color: "white",
    lineHeight: tokens.lineHeightBase100
  },
  mag: {
    color: tokens.colorBrandForegroundInverted
  },
  logo: {
    ...Flex,
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM
  },
  text: ColFlex
});

const txt = {
  size: 400
} as const;

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
export function Footer(): JSX.Element {
  const style = useStyles();

  return (
    <footer className={style.box}>
      <div className={style.main}>
        <div className={style.logo}>
          <Image src="/DTAG.svg" height="42px" />

          <div className={style.text}>
            <Text {...txt} className={style.mag}>
              Open
            </Text>
            <Text {...txt} className={style.white}>
              Telekom
            </Text>
            <Text {...txt} className={style.mag}>
              Cloud
            </Text>
          </div>
        </div>

        <div className={style.logo}>
          <Link href="https://open-telekom-cloud.com/en/contact">
            <Text {...txt} className={style.white}>Contact</Text>
          </Link>

          <Link href="https://open-telekom-cloud.com/en/disclaimer-of-liability">
            <Text {...txt} className={style.white}>Disclaimer of liability</Text>
          </Link>

          <Link href="https://open-telekom-cloud.com/en/data-protection">
            <Text {...txt} className={style.white}>Data privacy</Text>
          </Link>

          <Link href="https://open-telekom-cloud.com/en/imprint">
            <Text {...txt} className={style.white}>Imprint</Text>
          </Link>
        </div>
      </div>
    </footer>
  );
};
