import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { useRouter } from "~/Components/Router";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Delete");

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.1
 */
export function AdminProductDelete({ ProdId }: { ProdId: number }) {
  const { Nav } = useRouter();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Delete.useProduct({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Delete Product",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Product Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Nav("/Admin");
      location.reload();
    }
  });

  return (
    <div>
      <Button onClick={() => run(ProdId)}>Delete Product</Button>
    </div>
  )
}
