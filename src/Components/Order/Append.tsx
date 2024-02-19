import { Button, Field, Textarea, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { useState } from "react";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { IOrderComp } from "./Comment";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...Flex,
    justifyContent: "space-between"
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 1.0.0
 */
export function CommentAppend({ OrderId, Refresh, ParentLog, Status, Admin }: IOrderComp) {
  const log = useConst(() => ParentLog.With("Append"));

  const style = useStyles();
  const [cmt, setCmt] = useState<string>();

  const { dispatch, dispatchToast } = useErrorToast(log);

  const hub = (Admin ? AdminHub : Hub).Order.Post as typeof AdminHub.Order.Post & typeof Hub.Order.Post;

  const { run: append } = hub.useAppend({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Append Comment",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Comment Appended</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  const { run: cancel } = (Admin ? hub.useClose : hub.useCancel)({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: `Failed ${Admin ? "Close" : "Cancel"} Order`,
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Order {Admin ? "Closed" : "Cancelled"}</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  switch (Status) {
    case "Cancelled":
    case "Finished":
      return null;
  }

  return <>
    <Field label="Append" size="large">
      <Textarea value={cmt} onChange={(_, v) => setCmt(v.value)} maxLength={1000} />
    </Field>

    <div className={style.body}>
      {
        !(Status === "Finished" || Status === "Returning") &&
        <Button onClick={() => cancel(OrderId, cmt!)}>
          {
            Admin
              ? "Force Close"
              : Status === "Shipping" ? "Ask Return" : "Cancel Order"
          } with Reason
        </Button>
      }

      <Button appearance="primary" onClick={() => append(OrderId, cmt!)}>
        Add Comment
      </Button>
    </div>
  </>;
}
