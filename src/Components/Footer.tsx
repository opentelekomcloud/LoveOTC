import { Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Flex, NavW } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 */
const useStyles = makeStyles({
  box: {
    width: "-webkit-fill-available",
    marginTop: tokens.spacingVerticalXXXL,
    ...shorthands.padding(tokens.spacingVerticalXXL, 0),
    backgroundColor: tokens.colorNeutralBackgroundInverted
  },
  main: {
    ...Flex,
    maxWidth: NavW,
    ...shorthands.margin(0, "auto"),
  },
  white: {
    color: "white"
  },
  mag: {
    color: "#ED538B"
  },
  text: {
    ...Flex,
    ...shorthands.margin("64px", 0),
  }
});

const txt = {
  size: 800,
  weight: "medium"
} as const;

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export function Footer(): JSX.Element {
  const style = useStyles();

  return (
    <footer className={style.box}>
      <div className={style.main}>
        <div className={style.text}>
          <Text {...txt} className={style.mag}>
            Open
          </Text>
          <Text {...txt} weight="medium" className={style.white}>
            Telekom
          </Text>
          <Text {...txt} weight="medium" className={style.mag}>
            Cloud
          </Text>
        </div>

      </div>
    </footer>
  );
};
