import { Image, Link, Portal, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Dic } from "~/Helpers/Dic";
import { Flex, NavH, NavW } from "~/Helpers/Styles";
import { AdminTopNav } from "~/Pages/Admin/Nav";
import { AdminOrderExportButton } from "~/Pages/Admin/Order/Export";
import { AdminProductAddButton } from "~/Pages/Admin/Product/Add";
import { AdminUserFilter } from "~/Pages/Admin/User/Search";
import { AvatarMenu } from "./AvatarMenu";
import { ShopCart } from "./ShopCart";

/**
 * @author Aloento
 * @since 0.1.0 MusiLand
 * @version 0.1.0
 */
const useStyles = makeStyles({
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
 * @version 0.1.3
 */
export function TopNavBar() {
  const style = useStyles();

  return (
    <Portal>
      <header className={style.navBox}>
        <nav className={style.navBar}>
          <Link className={style.logoBox} href="/">
            <Image src="/telekom-logo.svg" height={NavH} />

            <Text size={600} className={style.logoText}>{Dic.Name}</Text>
          </Link>

          <AdminTopNav />

          <div className={style.logoBox}>
            <AdminProductAddButton />
            <AdminUserFilter />
            <AdminOrderExportButton />

            <ShopCart />
            <AvatarMenu />
          </div>
        </nav>
      </header>
    </Portal >
  )
}
