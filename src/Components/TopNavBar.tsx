import { Avatar, Image, Link, Portal, Text, ToggleButton, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { CartRegular } from "@fluentui/react-icons";
import { Flex, NavH } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0 ML
 * @version 0.1.0
 */
const useStyle = makeStyles({
  navBox: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: `${NavH}px`,
    ...shorthands.padding(0, tokens.spacingHorizontalXXXL),
    backgroundColor: "#fff",
    boxSizing: "border-box",
    boxShadow: tokens.shadow4
  },
  navBar: {
    ...Flex,
    height: "100%",
    ...shorthands.margin(0, "auto"),
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoBox: {
    ...Flex,
    columnGap: tokens.spacingHorizontalL,
    alignItems: "center"
  },
  logoText: {
    color: tokens.colorBrandForeground2
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
          <Link className={style.logoBox} href="/" appearance="subtle">
            <Image src="./telekom-logo.svg" height={NavH} />

            <Text size={600} font="monospace" className={style.logoText}>LoveOTC</Text>
          </Link>

          <div className={style.logoBox}>
            <ToggleButton icon={<CartRegular />} appearance="subtle" size="large" />

            <Avatar name="A L" size={36} />
          </div>
        </nav>
      </header>
    </Portal>
  )
}
