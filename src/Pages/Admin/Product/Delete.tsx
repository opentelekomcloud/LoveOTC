import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useRouter } from "~/Components/Router";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export function AdminProductDelete({ ProdId }: { ProdId: number }) {
  const { Nav } = useRouter();
  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Delete.Product.bind(AdminHub.Product.Delete), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        return dispatchError({
          Message: "Failed Delete Product",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Product Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Nav("/Admin");
      location.reload();
    },
  });

  return (
    <div>
      <Button onClick={() => run(ProdId)}>Delete Product</Button>
    </div>
  )
}
