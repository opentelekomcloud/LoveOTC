import { Button, Toast, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { useBoolean, useRequest } from "ahooks";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Lexical } from "~/Lexical/Lazy";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 1.2.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  btn: {
    ...Flex,
    columnGap: tokens.spacingVerticalS
  },
  drawer: {
    width: "1100px"
  }
});

const log = new Logger("Admin", "Product", "Lexical");

/**
 * @author Aloento
 * @since 1.2.0
 * @version 0.2.0
 */
export function AdminProductLexical({ ProdId }: { ProdId: number }) {
  const style = useStyles();
  const [open, { toggle, setTrue }] = useBoolean();

  const { data, run: update } = useRequest(() => Hub.Product.Get.Lexical(ProdId));

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Post.useLexical({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Update Description",
        Request: req,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Description Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      update();
      toggle();
    },
  });

  return <>
    <div>
      <Button onClick={() => setTrue()}>
        Open Description Editor
      </Button>
    </div>

    <Drawer
      open={open}
      onOpenChange={toggle}
      position="start"
      size="large"
      modalType="alert"
      className={style.drawer}
    >
      <DrawerHeader>
        <DrawerHeaderTitle action={
          <div className={style.btn}>
            <Button
              appearance="primary"
              onClick={() => run(ProdId)}
            >
              Save
            </Button>

            <Button onClick={() => toggle()}>
              Cancel
            </Button>
          </div>
        }>
          Edit Product Description
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <Lexical State={data?.Description} />
      </DrawerBody>
    </Drawer>
  </>
}
