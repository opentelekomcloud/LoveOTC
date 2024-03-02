import { Button, Input, Subtitle2, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useEffect, useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Variant", "Edit", "Name");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminProductVariantName({ VariantId }: { VariantId: number }) {
  const [name, setName] = useState("");
  const { data } = Hub.Product.Get.useVariant(VariantId, {
    onError: log.error
  });

  useEffect(() => {
    data && setName(data.Name);
  }, [data]);

  const [edit, { setTrue, setFalse }] = useBoolean();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Patch.useVariantName(VariantId, {
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
        ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(name)} disabled={loading} />
        : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
    />
  );
}
