import { Portal, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Flex, NavH } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0 ML
 * @version 0.1.0
 */
const useStyle = makeStyles({
  navBox: {
    position: "fixed",
    top: "0",
    width: "100%",
    height: `${NavH}px`,
    ...shorthands.padding(0, "32px"),
    backgroundColor: "#fff",
    boxSizing: "border-box",
    boxShadow: tokens.shadow4
  },
  navBar: {
    ...Flex,
    height: "100%",
    ...shorthands.margin("0", "auto"),
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoBox: {
    ...Flex,
    borderBottomStyle: "unset",
    columnGap: "8px",
    alignItems: "center"
  },
  logoText: {
    marginTop: "2px",
    color: tokens.colorPalettePlatinumForeground2
  }
});

/**
 * @author Aloento
 * @since 0.1.0 ML
 * @version 0.1.0
 */
export function TopNavBar() {
  const style = useStyle();

  return (
    <Portal>
      <header className={style.navBox}>
        <nav className={style.navBar}>
          <div>

          </div>

          <div>

          </div>
        </nav>
      </header>
    </Portal>
  )
}
