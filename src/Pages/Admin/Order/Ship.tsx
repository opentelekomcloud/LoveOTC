import { Button, Field, Input, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
interface IShipment {
  OrderId: number;
  TrackingNumber?: string;
  Refresh: () => void;
}

const log = new Logger("Admin", "Order", "Detail", "Shipment");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.3
 */
export function Shipment({ OrderId, TrackingNumber, Refresh }: IShipment) {
  const [edit, { setTrue, setFalse }] = useBoolean();
  const [track, setTrack] = useState(TrackingNumber);

  const { dispatch, dispatchToast } = useErrorToast(log);

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
      Refresh();
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
