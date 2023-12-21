import { Button, Input, Subtitle2, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { useRouter } from "~/Components/Router";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Name");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export function AdminProductName({ ProdId }: { ProdId: number; }) {
  const [name, setName] = useState("");
  const [edit, { setTrue, setFalse }] = useBoolean();
  const { Nav } = useRouter();

  useRequest(() => AdminHub.Product.Get.Name(ProdId), {
    onSuccess(data) {
      setName(data);
    },
    onError(e) {
      Nav("Admin");
      log.error(e);
    },
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Patch.useName({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Update Name",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Name Updated</ToastTitle>
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
        ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(ProdId, name)} />
        : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
    />
  );
}
