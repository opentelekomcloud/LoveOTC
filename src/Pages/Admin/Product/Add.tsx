import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTrigger, Input, Subtitle2, Toast, ToastBody, ToastTitle, makeStyles } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { useRouter } from "~/Components/Router";
import { Logger } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: ColFlex
});

const log = new Logger("Admin", "Product", "AddButton");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.3
 */
export function AdminProductAddButton() {
  const { Nav, Paths } = useRouter();
  const path1 = Paths.at(0);
  const path2 = Paths.at(1);

  const style = useStyles();
  const [name, setName] = useState("");

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Post.useCreate({
    onError(e, params) {
      dispatch({
        Message: `Failed Create ${name}`,
        Request: params,
        Error: e
      });
    },
    onSuccess(data) {
      dispatchToast(
        <Toast>
          <ToastTitle>New Product Created</ToastTitle>
          <ToastBody>{data} {name}</ToastBody>
        </Toast>,
        { intent: "success" }
      );

      Nav("Admin", data);
      setName("");
    }
  });

  return (
    path1 === "Admin" && !path2 &&
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<AddRegular />}>New Product</Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>

          <DialogContent className={style.body}>
            <Input
              required
              size="large"
              value={name}
              maxLength={15}
              appearance="underline"
              onChange={(_, v) => setName(v.value)}
              contentBefore={<Subtitle2>Give A Name</Subtitle2>}
            />
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>

            <Button
              disabled={loading}
              appearance="primary"
              onClick={() => run(name)}
            >
              Create
            </Button>
          </DialogActions>

        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
