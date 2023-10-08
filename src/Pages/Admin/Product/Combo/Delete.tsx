import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useRequest } from "ahooks";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminProductComboDelete({ ComboId, Refresh }: { ComboId: number; Refresh: () => void }) {
  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Delete.Combo, {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Delete Combo",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Combo Deleted</ToastTitle>
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
      onClick={() => run(ComboId)}
    />
  )
}
