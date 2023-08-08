import { makeStyles } from "@griffel/react";
import { ColFlex, NavH } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.2.2 ML
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
  }
});

/**
 * @author Aloento
 * @since 0.2.2 ML
 * @version 0.1.0
 */
export function Layout({ children }: { children?: React.ReactNode; }) {
  const style = useStyle();

  return <>
    <main className={style.body}>
      {children}
    </main>
  </>
}
