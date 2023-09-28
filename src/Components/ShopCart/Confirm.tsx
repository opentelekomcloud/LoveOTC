import { Button, Field, Textarea, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { ColFlex } from "~/Helpers/Styles";
import { DelegateDataGrid } from "../DataGrid/Delegate";
import { CartColumns } from "./Columns";
import { useShopCart } from "./Context";
import { ConfirmPersona } from "./Persona";

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
  sub: {
    width: "fit-content",
    alignSelf: "flex-end"
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.1
 */
export function Confirm() {
  const [open, { toggle }] = useBoolean();
  const style = useStyles();
  const { List } = useShopCart();

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
          <ConfirmPersona />

          <DelegateDataGrid Items={List} Columns={CartColumns} NoHeader />

          <Field label="Comment" size="large">
            <Textarea />
          </Field>

          <Button appearance="primary" className={style.sub} disabled={!List.length}>
            Submit
          </Button>
        </div>
      </DrawerBody>
    </Drawer>
  </>
}
