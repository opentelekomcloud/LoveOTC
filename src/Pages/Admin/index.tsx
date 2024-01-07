import { Spinner } from "@fluentui/react-components";
import { useMemo } from "react";
import { useRouter } from "~/Components/Router";
import { Logger } from "~/Helpers/Logger";
import { Hub } from "~/ShopNet";
import { AdminOrder } from "./Order";
import { AdminProduct } from "./Product";
import { AdminUser } from "./User";

const log = new Logger("Admin");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
function Admin() {
  const { Paths, Nav } = useRouter();
  const path = Paths.at(1);

  const content = useMemo(() => {
    switch (path) {
      case "Order":
        return <AdminOrder />;

      case "User":
        return <AdminUser />;

      default:
        return <AdminProduct />;
    }
  }, [path]);

  const { data, loading } = Hub.User.Get.useMe(log);

  if (loading)
    return <Spinner size="huge" label="Authenticating..." />;

  if (!data?.Admin)
    return Nav("/");

  return content;
}

/** @deprecated */
export default Admin;
