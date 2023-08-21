import { Button, Subtitle1, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular } from "@fluentui/react-icons";
import { ColFlex } from "~/Helpers/Styles";
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
        <Subtitle1>Required Products</Subtitle1>
        <AdminOrderList />

      </DrawerBody>
    </Drawer>
  )
}
