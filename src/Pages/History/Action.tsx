import { Button, Field, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { IOrderRef } from "~/Components/Order";
import { useRouter } from "~/Components/Router";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";

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
export function OrderAction({ OrderId, Status, Refresh, ParentLog }: IOrderRef & { Status?: string; }) {
  const log = useConst(() => ParentLog.With("Action"));

  const style = useStyles();
  const { Reload } = useRouter();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: received } = Hub.Order.Post.useReceived({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Mark Receive",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Order Received</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  const { run: remove } = Hub.Order.Delete.useDelete({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Delete Order",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Order Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Reload("History");
    }
  });

  switch (Status) {
    case "Pending":
    case "Processing":
    // case "Shipping":
    case "Finished":
    // case "Cancelled":
    case "Returning":
      return null;
  }

  return (
    <Field label="Action" size="large">
      <div className={style.body}>
        {
          Status === "Cancelled" &&
          <Button appearance="subtle" onClick={() => remove(OrderId)}>
            Delete Order
          </Button>
        }

        {
          Status === "Shipping" &&
          <Button appearance="subtle" onClick={() => received(OrderId)}>
            I Received Order
          </Button>
        }
      </div>
    </Field>
  );
}
