import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useRequest } from "ahooks";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductVariantDelete({ VariantId, Refresh }: { VariantId: number; Refresh: () => void }) {
  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Delete.Variant, {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Delete Variant",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Variant Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    },
  });

  return (
    <Button
      appearance="subtle"
      icon={<DeleteRegular />}
      onClick={() => run(VariantId)}
    />
  )
}
