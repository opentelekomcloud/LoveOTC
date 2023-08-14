import { Image, Link, Portal, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Flex, NavH, NavW } from "~/Helpers/Styles";
import { AvatarMenu } from "./AvatarMenu";
import { ShopCart } from "./ShopCart";

/**
 * @author Aloento
 * @since 0.1.0 MusiLand
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
    maxWidth: NavW,
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
 * @since 0.1.0 MusiLand
 * @version 0.1.0
 */
export function TopNavBar() {
  const style = useStyle();

  return (
    <Portal>
      <header className={style.navBox}>
        <nav className={style.navBar}>
          <Link className={style.logoBox} href="/" appearance="subtle">
            <Image src="/telekom-logo.svg" height={NavH} />

            <Text size={600} font="monospace" className={style.logoText}>LoveOTC</Text>
          </Link>

          <div className={style.logoBox}>
            <ShopCart />
            <AvatarMenu />
          </div>
        </nav>
      </header>
    </Portal>
  )
}
