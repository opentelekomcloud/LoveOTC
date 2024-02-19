import { Button, Field, Textarea, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { useState } from "react";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { IOrderComp } from ".";
import { useOrder } from "./useOrder";

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
 * @version 1.3.0
 */
export function CommentAppend({ OrderId, Refresh, Admin, ParentLog }: IOrderComp & { Refresh: () => void }) {
  const log = useConst(() => ParentLog.With("Append"));

  const style = useStyles();
  const [cmt, setCmt] = useState<string>();

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: append, loading } = (Admin ? AdminHub : Hub).Order.Post.useAppend({
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
      setCmt("");
    }
  });

  const { data: order, mutate } = useOrder(OrderId, Admin);

  const { run: cancel, loading: submit } = (Admin ? AdminHub : Hub).Order.Post.useCancel({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: `Failed ${Admin ? "Close" : "Cancel"} Order`,
        Request: params,
        Error: e
      });
    },
    onSuccess(data) {
      dispatchToast(
        <Toast>
          <ToastTitle>Order {Admin ? "Closed" : "Cancelled"}</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      mutate((old) => ({
        ...old!,
        Status: data
      }));
    }
  });

  switch (order?.Status) {
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
        !(order?.Status === "Finished" || order?.Status === "Returning") &&
        <Button
          onClick={() => cancel(OrderId, cmt!)}
          disabled={submit}
        >
          {
            Admin
              ? "Force Close"
              : order?.Status === "Shipping" ? "Ask Return" : "Cancel Order"
          } with Reason
        </Button>
      }

      <Button
        appearance="primary"
        onClick={() => append(OrderId, cmt!)}
        disabled={loading}
      >
        Add Comment
      </Button>
    </div>
  </>;
}
