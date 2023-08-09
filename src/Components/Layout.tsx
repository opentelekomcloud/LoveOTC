import { makeStyles, tokens } from "@fluentui/react-components";
import { ColFlex, NavH, NavW } from "~/Helpers/Styles";
import { Footer } from "./Footer";
import { TopNavBar } from "./TopNavBar";

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
    height: "-webkit-fill-available",
    justifyContent: "space-between"
  },
  content: {
    ...ColFlex,
    maxWidth: NavW,
    width: "-webkit-fill-available",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: tokens.spacingVerticalMNudge,
    paddingRight: tokens.spacingVerticalMNudge,
  }
});

/**
 * @author Aloento
 * @since 0.2.2 MusiLand
 * @version 0.1.1
 */
export function Layout({ children }: { children?: React.ReactNode; }) {
  const style = useStyle();

  return <>
    <TopNavBar />

    <div className={style.body}>
      <main className={style.content}>
        {children}
      </main>

      <Footer />
    </div>
  </>
}
