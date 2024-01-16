import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, Toast, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { GuidImage } from "~/Helpers/GuidImage";
import { Logger } from "~/Helpers/Logger";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";
import { IPhotoItem } from ".";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  box: {
    ...Flex,
    columnGap: tokens.spacingHorizontalL
  },
  img: {
    ...Cover,
    aspectRatio: "1",
    width: "50%"
  },
  cap: {
    ...ColFlex,
    flexGrow: 1,
    rowGap: tokens.spacingVerticalL
  }
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IAdminProductPhotoEdit {
  Photo: IPhotoItem;
  Refresh: () => void;
}

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.3
 */
export function AdminProductPhotoEdit({ Photo: { Id, Cover, Caption }, Refresh }: IAdminProductPhotoEdit) {
  const style = useStyles();
  const [cap, setCap] = useState(Caption || "");

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: updateCaption } = AdminHub.Product.Patch.useCaption({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Update Caption",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Caption Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
    }
  });

  const { run: updateFile } = AdminHub.Product.Patch.usePhoto(log, {
    manual: true,
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

      Refresh();
    }
  });

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

      Refresh();
    }
  });

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance="subtle"
          icon={<EditRegular />}
        />
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle action={
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<DismissRegular />} />
            </DialogTrigger>
          }>
            Image Detail
          </DialogTitle>

          <DialogContent className={style.box}>
            <GuidImage
              shape="rounded"
              className={style.img}
              Guid={Cover}
              Log={log}
            />

            <div className={style.cap}>
              <Field label="Caption">
                <Input value={cap} onChange={(_, e) => setCap(e.value)} />
              </Field>

              <Button onClick={() => updateCaption(Id, cap)}>
                Save Caption
              </Button>

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

              <Button appearance="primary" onClick={() => deletePhoto(Id)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
