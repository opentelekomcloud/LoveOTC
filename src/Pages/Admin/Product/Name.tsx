import { Button, Input, Subtitle2, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { useRouter } from "~/Components/Router";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductName({ ProdId }: { ProdId: number; }) {
  const [name, setName] = useState("");
  const [edit, { setTrue, setFalse }] = useBoolean();
  const { Nav } = useRouter();

  useRequest(AdminHub.Product.Get.Name.bind(AdminHub.Product.Get), {
    defaultParams: [ProdId],
    onSuccess(data) {
      setName(data);
    },
    onError() {
      throw Nav("Admin");
    },
  });

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Patch.Name.bind(AdminHub.Product.Patch), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        return dispatchError({
          Message: "Failed Update Name",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Name Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
    },
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
        ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(ProdId, name)} />
        : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
    />
  );
}
