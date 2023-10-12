import { Button, Field, Textarea, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import { Flex } from "~/Helpers/Styles";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

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
 * @version 0.2.0
 */
export function AdminOrderAppend({ OrderId, Refresh }: { OrderId: number; Refresh: (id: number) => void }) {
  const style = useStyles();
  const [cmt, setCmt] = useState<string>();

  const { dispatchError, dispatchToast } = use500Toast();

  const { run: append } = useRequest(AdminHub.Order.Post.Append.bind(AdminHub.Order.Post), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Append Comment",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Comment Appended</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh(OrderId);
    },
  });

  const { run: close } = useRequest(AdminHub.Order.Post.Close.bind(AdminHub.Order.Post), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Close",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Order Closed</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh(OrderId);
    },
  });

  return <>
    <Field label="Append" size="large">
      <Textarea value={cmt} onChange={(_, v) => setCmt(v.value)} maxLength={1000} />
    </Field>

    <div className={style.body}>
      <Button onClick={() => close(OrderId, cmt!)}>
        Force Close with Reason
      </Button>

      <Button appearance="primary" onClick={() => append(OrderId, cmt!)}>
        Add Comment
      </Button>
    </div>
  </>;
}
