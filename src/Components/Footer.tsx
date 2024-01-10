import { Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Flex, NavW } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 */
const useStyle = makeStyles({
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
  logo: {
    color: "white",
    ...shorthands.margin("64px", 0),
  },
  otc: {
    color: "white"
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export function Footer(): JSX.Element {
  const style = useStyle();

  return (
    <footer className={style.box}>
      <div className={style.main}>
        <Text size={800} className={style.logo}>
          OpenTelekomCloud
        </Text>

      </div>
    </footer>
  );
};
