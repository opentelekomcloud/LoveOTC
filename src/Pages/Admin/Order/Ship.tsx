import { Button, Field, Input, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useEffect, useState } from "react";
import { useOrder } from "~/Components/Order/useOrder";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Order", "Detail", "Shipment");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.1
 */
export function Shipment({ OrderId }: { OrderId: number }) {
  const [edit, { setTrue, setFalse }] = useBoolean();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { data: order, mutate } = useOrder(OrderId, true);
  const [track, setTrack] = useState<string>("");

  useEffect(() => {
    order?.TrackingNumber && setTrack(order?.TrackingNumber);
  }, [order]);

  const { run } = AdminHub.Order.Post.useShip({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Update Tracking Number",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Tracking Number Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
      mutate((old) => ({
        ...old!,
        TrackingNumber: track
      }));
    }
  });

  return (
    <Field label="Shipment" size="large">
      <Input
        value={track}
        disabled={!edit}
        appearance="underline"
        onChange={(_, v) => setTrack(v.value)}
        placeholder="Fill in this field to ship the order."
        contentAfter={edit
          ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(OrderId, track)} />
          : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
      />
    </Field>
  );
}
