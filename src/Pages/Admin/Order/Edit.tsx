import { Button, Field, Input, Label, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { AdminOrderList } from "./List";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminOrderEdit({ Open, Toggle }: { Open: boolean; Toggle: () => void }) {
  return (
    <Drawer
      open={Open}
      onOpenChange={Toggle}
      position="right"
      size="medium"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle action={
          <Button
            appearance="subtle"
            icon={<DismissRegular />}
            onClick={Toggle}
          />}
        >
          Order Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody style={{
        ...ColFlex,
        rowGap: tokens.spacingVerticalXL
      }}>
        <div style={Flex}>
          <div style={{
            ...ColFlex,
            flexBasis: "50%",
            rowGap: tokens.spacingVerticalM
          }}>
            <Field label="Name" size="large">
              <Label>Aloento</Label>
            </Field>
          </div>

          <div style={{
            ...ColFlex,
            flexBasis: "50%",
            rowGap: tokens.spacingVerticalM
          }}>
            <Field label="Phone" size="large">
              <Label>Aloento</Label>
            </Field>
          </div>
        </div>

        <div style={Flex}>
          <div style={{
            ...ColFlex,
            flexBasis: "50%",
            rowGap: tokens.spacingVerticalM
          }}>
            <Field label="E-Mail" size="large">
              <Label>Aloento@T-Systems.com</Label>
            </Field>
          </div>

          <div style={{
            ...ColFlex,
            flexBasis: "50%",
            rowGap: tokens.spacingVerticalM
          }}>
            <Field label="Status" size="large">
              <Label>Shipped</Label>
            </Field>
          </div>
        </div>

        <Field label="Address" size="large">
          <Label>Some Address Address Address Address Address Address Address</Label>
        </Field>

        <Field label="Comment" size="large">
          <Label>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Label>
        </Field>

        <Field label="Required Products" size="large">
          <AdminOrderList />
        </Field>

        <Field label="Shipment" size="large">
          <Input
            appearance="underline"
            defaultValue="Number123456789"
            contentAfter={<Button appearance="subtle" icon={<EditRegular />} />}
          />
        </Field>

        <div style={{
          ...Flex,
          columnGap: tokens.spacingVerticalM
        }}>
          <Button appearance="primary">Force Close</Button>
        </div>
      </DrawerBody>
    </Drawer>
  )
}
