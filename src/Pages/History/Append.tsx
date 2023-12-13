import { Button, Field, Textarea, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useState } from "react";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";

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
 * @version 0.2.1
 */
export function OrderAppend({ OrderId, Refresh }: { OrderId: number; Refresh: () => void }) {
  const style = useStyles();
  const [cmt, setCmt] = useState<string>();

  const { dispatch, dispatchToast } = useErrorToast();

  const { run: append } = Hub.Order.Post.useAppend({
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

  const { run: cancel } = Hub.Order.Post.useCancel({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Cancel Order",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Order Canceled</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  return <>
    <Field label="Append" size="large">
      <Textarea value={cmt} onChange={(_, v) => setCmt(v.value)} maxLength={1000} />
    </Field>

    <div className={style.body}>
      <Button onClick={() => cancel(OrderId, cmt!)}>
        Cancel Order with Reason
      </Button>

      <Button appearance="primary" onClick={() => append(OrderId, cmt!)}>
        Add Comment
      </Button>
    </div>
  </>;
}
