import { useRouter } from "~/Components/Router";
import { Product } from "./Product";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function EShopContent() {
  const { Paths } = useRouter();
  const path = Paths.at(0);

  return (
    <Product />
  )
}
