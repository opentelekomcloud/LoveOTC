import { Checkbox, Toast, ToastTitle } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminUserAdmin({ UserId, Admin, Refresh }: { UserId: number; Admin?: true; Refresh: () => void }) {
  const { dispatchError, dispatchToast } = use500Toast();

  const { run: grant } = useRequest(AdminHub.User.Post.Admin, {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Grant Admin",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Admin Granted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    },
  });

  const { run: revoke } = useRequest(AdminHub.User.Delete.Admin, {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Revoke Admin",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Admin Revoked</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    },
  });

  return (
    <Checkbox
      checked={Admin}
      onChange={(_, e) => {
        if (e.checked)
          grant(UserId);
        else
          revoke(UserId);
      }}
    />
  )
}
