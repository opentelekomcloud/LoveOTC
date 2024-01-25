import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IPhotoItem } from ".";

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit", "Delete");

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
export function AdminProductPhotoEditDelete({ Id, ProductId }: IPhotoItem) {
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: deletePhoto } = AdminHub.Product.Delete.usePhoto({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Delete Photo",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Photo Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    }
  });

  return (
    <Button appearance="primary" onClick={() => deletePhoto(ProductId, Id)}>
      Delete
    </Button>
  )
}
