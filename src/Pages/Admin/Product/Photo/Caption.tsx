import { Button, Field, Input, Toast, ToastTitle } from "@fluentui/react-components";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IPhotoItem } from ".";

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit", "Caption");

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
export function AdminProductPhotoEditCaption({ Id, Caption }: IPhotoItem) {
  const [cap, setCap] = useState(Caption || "");

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: updateCaption } = AdminHub.Product.Patch.useCaption({
    manual: true,
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
      <Input value={cap} onChange={(_, e) => setCap(e.value)} />
    </Field>

    <Button onClick={() => updateCaption(Id, cap)}>
      Save Caption
    </Button>
  </>;
}
