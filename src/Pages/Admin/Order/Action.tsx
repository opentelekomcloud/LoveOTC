import { Button, Field, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useOrder } from "~/Components/Order/useOrder";
import { Logger } from "~/Helpers/Logger";
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

const log = new Logger("Admin", "Order", "Detail", "Action");

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.3.0
 */
export function AdminOrderAction({ OrderId }: { OrderId: number; }) {
  const style = useStyles();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { data: order, mutate } = useOrder(OrderId, true);

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

      mutate((old) => ({ ...old!, Status: "Processing" }));
    }
  });

  switch (order?.Status) {
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
          order?.Status === "Pending" &&
          <Button
            appearance="subtle"
            onClick={() => accept(OrderId)}
          >
            Accept Order
          </Button>
        }
      </div>
    </Field>
  );
}
