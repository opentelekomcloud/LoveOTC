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
 * @version 0.1.0
 */
export function AdminProductPhotoAction(props: IPhotoItem & ICompLog) {
  const { Id, ParentLog } = props;
  const { dispatch } = useErrorToast(ParentLog);

  const { run } = AdminHub.Product.Post.useMovePhoto({
    manual: true,
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
      appearance="subtle"
      icon={<ArrowUpRegular />}
      onClick={() => run(Id, true)}
    />

    <Button
      appearance="subtle"
      icon={<ArrowDownRegular />}
      onClick={() => run(Id, false)}
    />

    <AdminProductPhotoEdit {...props} />
  </>;
}
