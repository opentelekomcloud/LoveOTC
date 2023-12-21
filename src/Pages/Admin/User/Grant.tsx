import { Checkbox, Toast, ToastTitle } from "@fluentui/react-components";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "User", "Grant");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.2
 */
export function AdminUserGrant({ UserId, Admin, Refresh }: { UserId: string; Admin?: boolean; Refresh: () => void }) {
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: grant } = AdminHub.User.Post.useAdmin({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Grant Admin",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Admin Granted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  const { run: revoke } = AdminHub.User.Delete.useAdmin({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Revoke Admin",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Admin Revoked</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
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
