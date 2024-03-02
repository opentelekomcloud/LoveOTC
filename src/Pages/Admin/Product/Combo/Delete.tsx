import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Combo", "Delete");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.2
 */
export function AdminProductComboDelete({ ComboId, Refresh }: { ComboId: number; Refresh: () => void }) {
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Delete.useCombo({
    onError(e, req) {
      dispatch({
        Message: "Failed Delete Combo",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
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
