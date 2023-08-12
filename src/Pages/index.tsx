import { useMemo } from "react";
import { useRouter } from "~/Components/Router";
import { Gallery } from "./Gallery";
import { Product } from "./Product";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function EShopContent() {
  const { Paths } = useRouter();
  const path = Paths.at(0);

  return useMemo(() => {
    switch (path) {
      case "Product":
        return <Product />;

      case "":
      case undefined:
        return <Gallery />;

      default:
        return <div>404</div>
    }
  }, [path])
}
