import { Button } from "@fluentui/react-components";
import { ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import { ICompLog } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { IPhotoItem } from ".";
import { AdminProductPhotoEdit } from "./Edit";

/**
 * @author Aloento
 * @since 1.4.0
 * @version 0.2.0
 */
export function AdminProductPhotoAction(props: IPhotoItem & ICompLog) {
  const { Id, ProductId, ParentLog } = props;
  const { dispatch } = useErrorToast(ParentLog);

  const { mutate } = Hub.Product.Get.usePhotoList(ProductId, ParentLog);

  const { run } = AdminHub.Product.Post.useMovePhoto({
    manual: true,
    onError(e, params) {
      dispatch({
        Message: "Failed Update Order",
        Request: params,
        Error: e
      });
    },
    onSuccess: (_, [__, up]) => mutate(old => {
      const list = old![0];

      const index = list.findIndex(x => x.PhotoId === Id);
      if (index === -1)
        return old;

      const newIndex = up ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= list.length)
        return old;

      const temp = list[index];
      list[index] = list[newIndex];
      list[newIndex] = temp;

      return old;
    })
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
