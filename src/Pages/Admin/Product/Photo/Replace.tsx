import { Button, Toast, ToastTitle } from "@fluentui/react-components";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit", "Replace");

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
export function AdminProductPhotoEditReplace({ Id }: { Id: number; }) {
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: updateFile } = AdminHub.Product.Patch.usePhoto(log, {
    manual: true,
    onBefore([prodId, file]) {
      dispatchToast(
        <Toast>
          <ToastTitle>Uploading Photo {file.name} for Product {prodId} to replace {Id}</ToastTitle>
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
    <Button onClick={() => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = () => {
        if (input.files)
          updateFile(Id, input.files[0]);
      };
      input.click();
    }}>
      Replace
    </Button>
  )
}
