import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useEffect } from "react";
import { useRouter } from "~/Components/Router";
import { ColFlex } from "~/Helpers/Styles";
import { AdminProductCategory } from "./Category";
import { AdminProductCombo } from "./Combo";
import { AdminProductDelete } from "./Delete";
import { AdminProductLexical } from "./Lexical";
import { AdminProductName } from "./Name";
import { AdminProductPhoto } from "./Photo";
import { AdminProductVariant } from "./Variant";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXXXL
  },
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.2
 */
export function AdminProductDetail({ ProdId }: { ProdId: number }) {
  const style = useStyles();
  const [open, { setFalse, setTrue }] = useBoolean();
  const { Nav, Paths } = useRouter();
  const id = parseInt(Paths.at(1)!);

  useEffect(() => {
    if (id === ProdId)
      setTrue();
    else
      setFalse();
  }, [Paths]);

  return <>
    <Button
      appearance="subtle"
      icon={<OpenRegular />}
      onClick={() => {
        Nav("Admin", ProdId);
        setTrue();
      }}
    />

    <Drawer
      open={open}
      position="end"
      size="large"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle action={
          <Button
            appearance="subtle"
            icon={<DismissRegular />}
            onClick={() => {
              Nav("Admin");
              setFalse();
            }}
          />}
        >
          Product Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={style.body}>
        <AdminProductName ProdId={ProdId} />
        <AdminProductCategory ProdId={ProdId} />

        <AdminProductPhoto ProdId={ProdId} />
        <AdminProductVariant ProdId={ProdId} />
        <AdminProductCombo ProdId={ProdId} />

        <AdminProductLexical ProdId={ProdId} />
        <AdminProductDelete ProdId={ProdId} />
      </DrawerBody>
    </Drawer>
  </>
}
