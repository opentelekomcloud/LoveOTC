import { Button, Field, Textarea, Toast, ToastBody, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { useConst } from "@fluentui/react-hooks";
import { DismissRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { DelegateDataGrid } from "../DataGrid";
import { useRouter } from "../Router";
import { CartColumns } from "./Columns";
import { useShopCart } from "./Context";
import { PersonaInfo } from "./Persona";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalXL
  },
  sub: {
    width: "fit-content",
    alignSelf: "flex-end"
  }
});

const log = new Logger("TopNavBar", "ShopCart", "Confirm");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.4.2
 */
export function Confirm() {
  const [cmt, setCmt] = useState<string>();
  const [open, { toggle }] = useBoolean();

  const { List, Update } = useShopCart();
  const { Nav } = useRouter();
  const style = useStyles();

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = Hub.Order.Post.useNew({
    manual: true,
    onError(e, req) {
      dispatch({
        Message: "Failed Create Order",
        Request: req,
        Error: e
      });
    },
    onSuccess(data) {
      dispatchToast(
        <Toast>
          <ToastTitle>Order Placed</ToastTitle>
          <ToastBody>Order Id: {data}</ToastBody>
        </Toast>,
        { intent: "success" }
      );

      Update([]);
      toggle();
      Nav("History", data);
    },
  });

  return <>
    <Button appearance="primary" onClick={toggle} disabled={!List.length}>Checkout</Button>

    <Drawer
      open={open}
      onOpenChange={toggle}
      position="end"
      size="medium"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              onClick={toggle}
            />
          }
        >
          Confirm Order
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={style.body}>
          <PersonaInfo Log={log} />

          <DelegateDataGrid Items={List} Columns={useConst(() => CartColumns(log))} NoHeader />

          <Field label="Comment" size="large">
            <Textarea value={cmt} onChange={(_, v) => setCmt(v.value)} maxLength={1000} />
          </Field>

          <Button
            appearance="primary"
            className={style.sub}
            disabled={!List.length}
            onClick={() => run(List, cmt)}
          >
            Submit
          </Button>
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
