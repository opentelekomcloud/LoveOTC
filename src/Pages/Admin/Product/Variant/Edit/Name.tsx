import { Button, Input, Subtitle2, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Variant", "Edit", "Name");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export function AdminProductVariantName({ Id, Name }: { Id: number; Name: string; }) {
  const [name, setName] = useState(Name);
  const [edit, { setTrue, setFalse }] = useBoolean();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Patch.useVariantName({
    onError(e, params) {
      dispatch({
        Message: "Failed Update Variant Name",
        Request: params[0],
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Variant Name Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
    }
  });

  return (
    <Input
      size="large"
      value={name}
      disabled={!edit}
      appearance="underline"
      onChange={(_, v) => setName(v.value)}
      contentBefore={<Subtitle2>Name</Subtitle2>}
      contentAfter={edit
        ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(Id, name)} />
        : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
    />
  );
}
