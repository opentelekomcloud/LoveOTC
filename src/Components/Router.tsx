import { useMemoizedFn, useMount } from "ahooks";
import { createContext, useContext, useState } from "react";
import { Combine } from "~/Helpers/Path";

/**
 * @author Aloento
 * @since 0.1.0 ML
 * @version 0.1.0
 */
interface IRouter {
  Paths: readonly string[],
  Nav: (...paths: (string | false | undefined)[]) => void,
  Rep: (...paths: (string | false | undefined)[]) => void,
  Reload: (bool: boolean) => void,
}

const Router = createContext({} as IRouter);

/**
 * @author Aloento
 * @since 0.1.0 ML
 * @version 0.1.0
 */
export function useRouter() {
  return useContext(Router);
}

let reload = false;

/**
 * @author Aloento
 * @since 0.1.1 ML
 * @version 0.1.0
 */
export function BrowserRouter({ children }: { children: JSX.Element }): JSX.Element {
  const [router, setRouter] = useState<IRouter>(() => ({
    Paths: location.pathname.split("/").filter(x => x),
    Nav: (...p) => nav(Combine(p)),
    Rep: (...p) => rep(Combine(p)),
    Reload: (bool) => reload = bool
  }));

  const update = useMemoizedFn((path: string) => {
    router.Paths = path.split("/").filter(x => x);
    setRouter({ ...router });
  });

  const nav = useMemoizedFn((path: string) => {
    history.pushState(null, "", path);
    update(path);
  });

  const rep = useMemoizedFn((path: string) => {
    history.replaceState(null, "", path);
    update(path);
  });

  useMount(() => {
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
    <Router.Provider value={{ ...router }}>
      {children}
    </Router.Provider>
  );
}
