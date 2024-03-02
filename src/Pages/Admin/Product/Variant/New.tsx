import { Button, Field, Input, Popover, PopoverSurface, PopoverTrigger, Toast, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
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

const log = new Logger("Admin", "Product", "Detail", "Variant", "New");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function AdminProductNewVariant({ ProdId }: { ProdId: number; }) {
  const style = useStyles();
  const [open, { toggle }] = useBoolean();
  const [name, setName] = useState("");

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Post.useVariant(ProdId, {
    onError(e, params) {
      dispatch({
        Message: "Failed Create Variant",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Variant Created</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setName("");
      toggle();
    }
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

        <Button
          disabled={loading}
          onClick={() => run(name)}
        >
          Add
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
