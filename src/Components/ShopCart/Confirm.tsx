import { Badge, Button, DialogBody, DialogContent, DialogSurface, DialogTitle, Field, Textarea, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { useConst } from "@fluentui/react-hooks";
import { DismissRegular } from "@fluentui/react-icons";
import { CheckmarkFilled } from "@fluentui/react-icons/lib/fonts";
import { useBoolean } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { ColFlex, Flex } from "~/Helpers/Styles";
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
 * @version 0.2.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalXL
  },
  sub: {
    width: "fit-content",
    alignSelf: "flex-end"
  },
  title: {
    ...Flex,
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
  }
});

const log = new Logger("TopNavBar", "ShopCart", "Confirm");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.5.0
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
        <DialogSurface>
          <DialogBody>
            <DialogTitle className={style.title}>
              <Badge size="large" color="success" icon={<CheckmarkFilled />} />
              Thank You!
            </DialogTitle>

            <DialogContent>
              Your order {data} has been placed and is being processed.
              <br /><br />
              You can click Avatar -{">"} History to view details,
              <br />
              send us an additional comment or even cancel it.
              <br /><br />
              You will now be taken to your order details.
            </DialogContent>
          </DialogBody>
        </DialogSurface>,
        {
          onStatusChange(_, toast) {
            if (toast.status === "unmounted")
              Nav("History", data);
          },
        }
      );

      toggle();
      Update([]);
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
