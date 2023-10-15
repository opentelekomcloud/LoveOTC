import { Button, Input, Subtitle2, Toast, ToastTitle } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductCategory({ ProdId }: { ProdId: number; }) {
  const [cate, setCate] = useState("");
  const [edit, { setTrue, setFalse }] = useBoolean();

  useRequest(AdminHub.Product.Get.Category.bind(AdminHub.Product.Get), {
    defaultParams: [ProdId],
    onSuccess(data) {
      setCate(data);
    }
  });

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Patch.Category.bind(AdminHub.Product.Patch), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        return dispatchError({
          Message: "Failed Update Category",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Category Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
    },
  });

  return (
    <Input
      size="large"
      value={cate}
      disabled={!edit}
      appearance="underline"
      onChange={(_, v) => setCate(v.value)}
      contentBefore={<Subtitle2>Category</Subtitle2>}
      contentAfter={edit
        ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => run(ProdId, cate)} />
        : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
    />
  );
}
