import { Button, Field, Input, Toast, ToastTitle } from "@fluentui/react-components";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit", "Caption");

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.2.1
 */
export function AdminProductPhotoEditCaption({ PhotoId }: { PhotoId: number; }) {
  const [cap, setCap] = useState("");

  Hub.Product.Get.usePhoto(PhotoId, {
    onError: log.error,
    onSuccess({ Caption }) {
      if (Caption)
        setCap(Caption);
    },
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Patch.useCaption(PhotoId, {
    onError(e, req) {
      dispatch({
        Message: "Failed Update Caption",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Caption Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    }
  });

  return <>
    <Field label="Caption">
      <Input value={cap} placeholder="Write some infomation here?" onChange={(_, e) => setCap(e.value)} />
    </Field>

    <Button
      disabled={loading}
      onClick={() => run(cap)}
    >
      Save Caption
    </Button>
  </>;
}
