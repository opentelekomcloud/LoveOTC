import { Button, Field, Label, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { useRouter } from "~/Components/Router";
import { useShopCart } from "~/Components/ShopCart/Context";
import { PersonaInfo } from "~/Components/ShopCart/Persona";
import { ColFlex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { OrderAppend } from "./Append";
import { DetailColumns } from "./DetailColumns";

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

  const { Nav, Paths } = useRouter();
  const id = parseInt(Paths.at(2)!);

  const { List, Update } = useShopCart();
  const style = useStyles();

  const { data, run } = useRequest(Hub.Order.Get.Detail, {
    onBefore() {
      isNaN(id) && Nav("/History");
    },
    onError() {
      throw Nav("/History");
    },
    manual: true
  })

  return <>
    <Button appearance="subtle" icon={<OpenRegular />} onClick={() => {
      run(id);
      toggle();
    }} />

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

          <OrderAppend OrderId={id} Refresh={() => run(id)} />
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
