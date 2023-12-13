import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export function AdminProductTypeDelete({ VariantId, Type, Refresh }: { VariantId: number; Type: string; Refresh: () => void }) {
  const { dispatch, dispatchToast } = useErrorToast();

  const { run } = AdminHub.Product.Delete.useType({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Delete Type",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Type Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  return (
    <Button
      appearance="subtle"
      icon={<DeleteRegular />}
      onClick={() => run(VariantId, Type)}
    />
  )
}
