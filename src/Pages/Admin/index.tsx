import { useMemo } from "react";
import { useRouter } from "~/Components/Router";
import { AdminProduct } from "./Product";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function Admin() {
  const { Paths } = useRouter();
  const path = Paths.at(1);

  return useMemo(() => {
    switch (path) {
      case "Product":
        return <AdminProduct />;

      case "":
      case undefined:
        return <AdminProduct />;

      default:
        return <div>404</div>
    }
  }, [path])
}
