import { Button, Field, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { IOrderRef } from "~/Components/Order";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    alignItems: "flex-start",
  },
});

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.2.0
 */
export function AdminOrderAction({ OrderId, Status, Refresh, ParentLog }: IOrderRef & { Status?: string; }) {
  const log = useConst(() => ParentLog.With("Action"));

  const style = useStyles();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: accept } = AdminHub.Order.Post.useAccept({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Accept Order",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Order Accepted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  switch (Status) {
    // case "Pending":
    case "Processing":
    case "Shipping":
    case "Finished":
    case "Cancelled":
    case "Returning":
      return null;
  }

  return (
    <Field label="Action" size="large">
      <div className={style.body}>
        {
          Status === "Pending" &&
          <Button appearance="subtle" onClick={() => accept(OrderId)}>
            Accept Order
          </Button>
        }
      </div>
    </Field>
  );
}
