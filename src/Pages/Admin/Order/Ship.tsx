import { Button, Field, Input, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { use500Toast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function Shipment({ OrderId, Refresh }: { OrderId: number; Refresh: (id: number) => void }) {
  const [edit, { setTrue, setFalse }] = useBoolean();
  const [track, setTrack] = useState<string>();

  const { dispatchError, dispatchToast } = use500Toast();

  useRequest(Hub.Order.Get.Order.bind(Hub.Order.Get.bind(Hub.Order.Get)), {
    defaultParams: [OrderId],
    onSuccess(data) {
      setTrack(data?.TrackingNumber);
    },
  });

  const { run } = useRequest(AdminHub.Order.Post.Ship.bind(AdminHub.Order.Post), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        return dispatchError({
          Message: "Failed Update Tracking Number",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Tracking Number Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
      Refresh(OrderId);
    },
  });

  return (
    <Field label="Shipment" size="large">
      <Input
        value={track}
        disabled={!edit}
        appearance="underline"
        onChange={(_, v) => setTrack(v.value)}
        contentAfter={edit
          ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(OrderId, track)} />
          : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
      />
    </Field>
  );
}
