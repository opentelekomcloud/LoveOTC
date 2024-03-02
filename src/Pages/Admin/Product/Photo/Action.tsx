import { Button } from "@fluentui/react-components";
import { ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import { ICompLog } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IPhotoItem } from ".";
import { AdminProductPhotoEdit } from "./Edit";

/**
 * @author Aloento
 * @since 1.4.0
 * @version 0.3.0
 */
export function AdminProductPhotoAction({ ParentLog, ...props }: IPhotoItem & ICompLog) {
  const { dispatch } = useErrorToast(ParentLog);

  const { run, loading } = AdminHub.Product.Post.useMovePhoto(props, {
    onError(e, params) {
      dispatch({
        Message: "Failed Update Order",
        Request: params,
        Error: e
      });
    }
  });

  return <>
    <Button
      disabled={loading}
      appearance="subtle"
      icon={<ArrowUpRegular />}
      onClick={() => run(true)}
    />

    <Button
      disabled={loading}
      appearance="subtle"
      icon={<ArrowDownRegular />}
      onClick={() => run(false)}
    />

    <AdminProductPhotoEdit {...props} />
  </>;
}
