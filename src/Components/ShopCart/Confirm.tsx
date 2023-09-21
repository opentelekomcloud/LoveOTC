import { Button, Field, Label, Textarea, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { DelegateDataGrid } from "../DelegateDataGrid";
import { CartColumns } from "./Columns";
import { useShopCart } from "./Context";

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
  person: Flex,
  inf: {
    ...ColFlex,
    flexBasis: "50%",
    rowGap: tokens.spacingVerticalM
  },
  sub: {
    width: "fit-content",
    alignSelf: "flex-end"
  }
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
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
          <div className={style.person}>
            <div className={style.inf}>
              <Field label="Name" size="large">
                <Label>Aloento</Label>
              </Field>
            </div>

            <div className={style.inf}>
              <Field label="Phone" size="large">
                <Label>123456789</Label>
              </Field>
            </div>
          </div>

          <Field label="Address" size="large">
            <Label>Some Address Address Address Address Address Address Address</Label>
          </Field>

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
