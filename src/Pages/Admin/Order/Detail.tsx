import { Button, Field, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useMount, useRequest } from "ahooks";
import { OrderPersona } from "~/Components/Persona";
import { useRouter } from "~/Components/Router";
import { ColFlex } from "~/Helpers/Styles";
import { OrderComment } from "~/Pages/History/Comment";
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

  const { data, run } = useRequest(() => Hub.Order.Get.Detail(OrderId), {
    onError(e) {
      Nav("Admin", "Order");
      console.error(e);
    },
    manual: true
  })

  useMount(() => {
    if (parseInt(Paths.at(2)!) === OrderId) {
      run();
      setTrue();
    }
  });

  return <>
    <Button
      appearance="subtle"
      icon={<OpenRegular />}
      onClick={() => {
        Nav("Admin", "Order", OrderId);
        run();
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

        <OrderComment Comments={data?.Comments} />

        <AdminOrderAppend OrderId={OrderId} Refresh={run} />
      </DrawerBody>
    </Drawer>
  </>
}
