import { useMemo } from "react";
import { useRouter } from "~/Components/Router";
import { AdminOrder } from "./Order";
import { AdminProduct } from "./Product";
import { AdminUser } from "./User";

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

      case "Order":
        return <AdminOrder />;

      case "User":
        return <AdminUser />;

      default:
        return <AdminProduct />;
    }
  }, [path])
}
