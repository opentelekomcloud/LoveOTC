import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Variant", "Delete");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 * @todo Add the ability to refresh the variant list
 */
export function AdminProductVariantDelete({ VariantId }: { VariantId: number; }) {
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Delete.useVariant(VariantId, {
    onError(e, req) {
      dispatch({
        Message: "Failed Delete Variant",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Variant Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    }
  });

  return (
    <Button
      disabled={loading}
      appearance="subtle"
      icon={<DeleteRegular />}
      onClick={() => run()}
    />
  )
}
