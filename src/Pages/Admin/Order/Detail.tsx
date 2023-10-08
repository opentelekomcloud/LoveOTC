import { Button, Field, Label, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useMount, useRequest } from "ahooks";
import { OrderPersona } from "~/Components/Persona";
import { useRouter } from "~/Components/Router";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { AdminOrderAppend } from "./Append";
import { AdminOrderList } from "./List";
import { Shipment } from "./Ship";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalXL
  }
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminOrderDetail({ OrderId }: { OrderId: number; }) {
  const style = useStyles();
  const [open, { toggle, setTrue }] = useBoolean();
  const { Nav, Paths } = useRouter();

  const { data, run } = useRequest(Hub.Order.Get.Detail, {
    onError() {
      throw Nav("Admin", "Order");
    },
    manual: true
  })

  useMount(() => {
    if (parseInt(Paths.at(2)!) === OrderId) {
      run(OrderId);
      setTrue();
    }
  });

  return <>
    <Button
      appearance="subtle"
      icon={<OpenRegular />}
      onClick={() => {
        Nav("Admin", "Order", OrderId);
        run(OrderId);
        setTrue();
      }}
    />

    <Drawer
      open={open}
      onOpenChange={toggle}
      position="end"
      size="medium"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle action={
          <Button
            appearance="subtle"
            icon={<DismissRegular />}
            onClick={() => {
              Nav("Admin", "Order");
              toggle();
            }}
          />}
        >
          Order Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={style.body}>
        <OrderPersona OrderId={OrderId} Admin />

        <Field label="Required Products" size="large">
          <AdminOrderList Items={data?.ShopCart} />
        </Field>

        <Shipment OrderId={OrderId} Refresh={run} />

        <Field label="Comment" size="large">
          <Label>{data?.Comment}</Label>
        </Field>

        <AdminOrderAppend OrderId={OrderId} Refresh={run} />
      </DrawerBody>
    </Drawer>
  </>
}
