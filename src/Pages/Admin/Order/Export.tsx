import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { ArrowDownloadRegular } from "@fluentui/react-icons";
import { useRequest } from "ahooks";
import { useRouter } from "~/Components/Router";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Order", "ExportButton");

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.1
 */
export function AdminOrderExportButton() {
  const { Paths } = useRouter();
  const path1 = Paths.at(0);
  const path2 = Paths.at(1);

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = useRequest(() => AdminHub.Order.Get.Export(log), {
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Export Orders",
        Request: params,
        Error: e
      });
    },
    onSuccess(url) {
      dispatchToast(
        <Toast>
          <ToastTitle>Orders Exported</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      const a = document.createElement("a");
      a.href = url;
      a.download = `AllOrders_${new Date().toISOString()}.xlsx`;
      a.click();
    }
  });

  return (
    path1 === "Admin" && path2 === "Order" &&
    <Button
      appearance="subtle"
      icon={<ArrowDownloadRegular />}
      onClick={run}
      disabled={loading}>
      Export Orders
    </Button>
  )
}
