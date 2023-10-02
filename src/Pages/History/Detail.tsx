import { Button, Field, Label, Toast, ToastBody, ToastTitle, makeStyles, tokens, useToastController } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { useRouter } from "~/Components/Router";
import { useShopCart } from "~/Components/ShopCart/Context";
import { PersonaInfo } from "~/Components/ShopCart/Persona";
import { WarpError } from "~/Helpers/Error";
import { ColFlex } from "~/Helpers/Styles";
import { use500Toast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { OrderAppend } from "./Append";
import { DetailColumns } from "./Columns";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalL
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function OrderDetail() {
  const [open, { toggle }] = useBoolean();

  const { List, Update } = useShopCart();
  const { Nav } = useRouter();
  const style = useStyles();

  const { dispatchToast } = useToastController();
  const dispatchError = use500Toast();

  const { run } = useRequest(Hub.Order.Post.New, {
    onFinally([req], data, e) {
      if (e)
        dispatchError(new WarpError({
          Message: "Cannot Create Order",
          Request: req,
          Error: e
        }));

      dispatchToast(
        <Toast>
          <ToastTitle>Order Canceled</ToastTitle>
          <ToastBody>Order Id: {data}</ToastBody>
        </Toast>,
        { intent: "success" }
      );

      Update([]);
      toggle();
      Nav("History", `${data}`);
    },
    manual: true,
  })

  return <>
    <Button appearance="subtle" icon={<OpenRegular />} onClick={toggle} />

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
          Order Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={style.body}>
          <PersonaInfo />

          <DelegateDataGrid Items={List} Columns={DetailColumns} />

          <Field label="Comment" size="large">
            <Label>{""}</Label>
          </Field>

          <OrderAppend />
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
