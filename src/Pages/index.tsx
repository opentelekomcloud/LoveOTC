import { Spinner, makeStyles, tokens } from "@fluentui/react-components";
import { Suspense, lazy, useMemo } from "react";
import { NewUser } from "~/Components/NewUser";
import { ColFlex, NavH, NavW } from "~/Helpers/Styles";
import { Footer } from "../Components/Footer";
import { useRouter } from "../Components/Router";
import { TopNavBar } from "../Components/TopNavBar";
import { NotFound } from "./404";

/**
 * @author Aloento
 * @since 0.2.2 MusiLand
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    minWidth: "375px",
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
 * @version 0.4.0
 */
export function Layout() {
  const style = useStyles();
  const { Paths } = useRouter();
  const path = Paths.at(0);

  const match = useMemo(() => {
    switch (path) {
      case "Product":
        return <Product />;

      case "Admin":
        return <Admin />;

      case "History":
        return <History />;

      case "Login":
        return <Spinner size="huge" label="Login Redirecting..." />;

      case "Reload":
        return <Spinner size="huge" label="Reloading..." />;

      case "":
      case undefined:
        return <Gallery />;

      default:
        return <NotFound />;
    }
  }, [path]);

  return <>
    <TopNavBar />

    <div className={style.body}>
      <main className={style.content}>
        <Suspense fallback={<Spinner />}>
          {match}
        </Suspense>
      </main>

      <Footer />
    </div>

    <NewUser />
  </>
}

const Product = lazy(() => import("~/Pages/Product"));

const Admin = lazy(() => import("~/Pages/Admin"));

const History = lazy(() => import("~/Pages/History"));

const Gallery = lazy(() => import("~/Pages/Gallery"));
