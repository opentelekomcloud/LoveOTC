import { useMount } from "ahooks";
import { ReactNode, createContext, useContext, useState } from "react";
import { Combine } from "~/Helpers/Path";

/**
 * @author Aloento
 * @since 0.5.0 MusiLand
 * @version 0.2.2
 */
interface IRouter {
  Paths: readonly string[],
  Search: URLSearchParams,
  readonly Put: (search: URLSearchParams) => void,
  readonly Nav: (...paths: readonly any[]) => void,
  readonly Rep: (...paths: readonly any[]) => void,
  readonly Fresh: (...paths: readonly any[]) => void,
  readonly Reload: (bool: boolean) => void,
}

/**
 * @author Aloento
 * @since 0.5.0 MusiLand
 * @version 0.1.0
 */
const Router = createContext({} as IRouter);

/**
 * @author Aloento
 * @since 0.5.0 MusiLand
 * @version 0.1.0
 */
export function useRouter() {
  return useContext(Router);
}

/**
 * @author Aloento
 * @since 0.5.0 MusiLand
 * @version 0.1.0
 */
let reload = false;

/**
 * @author Aloento
 * @since 0.5.0 MusiLand
 * @version 0.2.2
 */
export function BrowserRouter({ children }: { children: ReactNode }): ReactNode {
  const [router, setRouter] = useState<IRouter>(() => ({
    Paths: location.pathname.split("/").filter(x => x),
    Search: new URLSearchParams(location.search),
    Put: put,
    Nav: (...p) => nav(Combine(p)),
    Rep: (...p) => rep(Combine(p)),
    Fresh: (...p) => fresh(Combine(p)),
    Reload: (bool) => reload = bool
  }));

  function put(search: URLSearchParams) {
    history.replaceState(null, "", `${location.pathname}${search.size ? "?" : ""}${search.toString()}`);
    router.Search = new URLSearchParams(search);
    setRouter({ ...router });
  }

  function update(path: string) {
    router.Paths = path.split("/").filter(x => x);
    router.Search = new URLSearchParams(location.search);
    setRouter({ ...router });
  }

  function nav(path: string) {
    history.pushState(null, "", path);
    update(path);
  }

  function rep(path: string) {
    history.replaceState(null, "", path);
    update(path);
  }

  function fresh(path: string) {
    history.pushState(null, "", path);
    location.reload();
  }

  useMount(() => {
    if (location.pathname === "/")
      if (location.search.startsWith("?/"))
        rep(location.search.substring(2));

    addEventListener("click", e => {
      const target = (e.target as HTMLElement)?.closest("a");

      if (target) {
        if (target.origin !== location.origin) {
          target.target = "_blank";
          return;
        }

        if (reload)
          return;

        e.preventDefault();
        nav(target.pathname);
      }
    });

    addEventListener("popstate", e => {
      if (reload)
        location.reload();

      e.preventDefault();
      update(location.pathname);
    });
  });

  return (
    <Router.Provider value={router}>
      {children}
    </Router.Provider>
  );
}
