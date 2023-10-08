import { Button, Field, Input, Popover, PopoverSurface, PopoverTrigger, Toast, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { ColFlex } from "~/Helpers/Styles";
import { use500Toast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalM
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export function AdminProductNewVariant({ ProdId, Refresh }: { ProdId: number; Refresh: (prodId: number) => void }) {
  const style = useStyles();
  const [open, { toggle }] = useBoolean();
  const [name, setName] = useState("");

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Post.Variant, {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: "Failed Create Variant",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Variant Created</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh(ProdId);
      setName("");
      toggle();
    },
  });

  return (
    <Popover withArrow open={open} onOpenChange={toggle}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<AddRegular />}>
          New Variant
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={style.body}>
        <Field required label="Variant Name">
          <Input value={name} onChange={(_, e) => setName(e.value)} />
        </Field>

        <Button onClick={() => run(ProdId, name)}>
          Add
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
