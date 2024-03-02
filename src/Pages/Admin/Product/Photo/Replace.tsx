import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IPhotoItem } from ".";

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit", "Replace");

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.2.0
 */
export function AdminProductPhotoEditReplace({ PhotoId, ProductId }: IPhotoItem) {
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: updateFile, loading } = AdminHub.Product.Patch.usePhoto(PhotoId, log, {
    onBefore([file]) {
      dispatchToast(
        <Toast>
          <ToastTitle>Uploading Photo {file.name} for Product {ProductId} to replace {PhotoId}</ToastTitle>
        </Toast>,
        { intent: "info" }
      );
    },
    onError(e, req) {
      dispatch({
        Message: "Failed Update Photo",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Photo Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    }
  });

  return (
    <Button
      disabled={loading}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = () => {
          if (input.files)
            updateFile(input.files[0]);
        };
        input.click();
      }}>
      {loading ? "Uploading..." : "Replace"}
    </Button>
  )
}
