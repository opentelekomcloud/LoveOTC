import { Button, Input, Subtitle2, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { ColFlex, Cover } from "~/Helpers/Styles";
import { AdminProductCombo } from "./Combo";
import { AdminProductPhoto } from "./Photo";
import { AdminProductVariant } from "./Variant";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  img: {
    aspectRatio: "1",
    ...Cover,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  }
})

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function AdminProductEdit({ Open, Toggle }: { Open: boolean; Toggle: () => void }) {
  const style = useStyle();

  return (
    <Drawer
      open={Open}
      onOpenChange={Toggle}
      position="right"
      size="large"
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
          Product Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody style={{
        ...ColFlex,
        rowGap: tokens.spacingVerticalXL
      }}>
        <Input
          size="large"
          appearance="underline"
          defaultValue="OTC SHIRT - GREY"
          contentBefore={<Subtitle2>Name</Subtitle2>}
          contentAfter={<Button appearance="subtle" icon={<EditRegular />} />}
        />

        <AdminProductPhoto />
        <AdminProductVariant />
        <AdminProductCombo />
      </DrawerBody>
    </Drawer>
  )
}
