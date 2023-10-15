import { makeStyles, tokens } from "@fluentui/react-components";
import { NewUser } from "~/Components/NewUser";
import { ColFlex, NavH, NavW } from "~/Helpers/Styles";
import { Admin } from "~/Pages/Admin";
import { Gallery } from "~/Pages/Gallery";
import { History } from "~/Pages/History";
import { Product } from "~/Pages/Product";
import { Footer } from "../Components/Footer";
import { useRouter } from "../Components/Router";
import { TopNavBar } from "../Components/TopNavBar";

/**
 * @author Aloento
 * @since 0.2.2 MusiLand
 * @version 0.1.0
 */
const useStyle = makeStyles({
  body: {
    ...ColFlex,
    minWidth: "1024px",
    position: "absolute",
    marginTop: `${NavH}px`,
    width: "100%",
    minHeight: "-webkit-fill-available",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2
  },
  content: {
    ...ColFlex,
    maxWidth: NavW,
    width: "-webkit-fill-available",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXXXL
  }
});

/**
 * @author Aloento
 * @since 0.2.2 MusiLand
 * @version 0.2.0
 */
export function Layout() {
  const style = useStyle();
  const { Paths } = useRouter();
  const path = Paths.at(0);

  function Matcher() {
    switch (path) {
      case "Product":
        return <Product />;

      case "Admin":
        return <Admin />;

      case "History":
        return <History />;

      case "":
      case undefined:
        return <Gallery />;

      default:
        return <div>404</div>;
    }
  }

  return <>
    <TopNavBar />

    <div className={style.body}>
      <main className={style.content}>
        <Matcher />
      </main>

      <Footer />
    </div>

    <NewUser />
  </>
}
