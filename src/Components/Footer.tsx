import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Flex } from "~/Helpers/Styles";

const useStyle = makeStyles({
  box: {
    width: "-webkit-fill-available",
    marginTop: tokens.spacingVerticalXXL,
    ...shorthands.padding(tokens.spacingVerticalXXL, 0),
    backgroundColor: tokens.colorNeutralBackgroundInverted
  },
  main: {
    ...Flex,
    ...shorthands.margin(0, "auto"),
  },
  logo: {
    width: "300px",
    filter: "brightness(200)"
  },
  otc: {
    color: "white"
  }
});

/**
 * @author Aloento
 * @since 0.3.1 MusiLand
 * @version 0.1.0
 */
export function Footer(): JSX.Element {
  const style = useStyle();

  return (
    <footer className={style.box}>
      <div className={style.main}>
        <img src="/systems-logo.png" className={style.logo} />
      </div>
    </footer>
  );
};