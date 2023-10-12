import { Button, Field, Input, Popover, PopoverSurface, PopoverTrigger, Toast, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, EditRegular } from "@fluentui/react-icons";
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
 * @version 0.1.0
 */
export function AdminProductType({ VariantId, Type, Refresh, New }: { VariantId: number; Type?: string; Refresh: () => void; New?: true }) {
  const style = useStyles();
  const [open, { toggle }] = useBoolean();
  const [name, setName] = useState(Type || "");

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(New ? AdminHub.Product.Post.Type.bind(AdminHub.Product.Post) : AdminHub.Product.Patch.Type.bind(AdminHub.Product.Patch), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        dispatchError({
          Message: `Failed ${New ? "Create" : "Update"} Type`,
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Type {New ? "Created" : "Updated"}</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
      setName("");
      toggle();
    },
  });

  return (
    <Popover withArrow open={open} onOpenChange={toggle}>
      <PopoverTrigger disableButtonEnhancement>
        {
          New ?
            <Button icon={<AddRegular />} appearance="primary">New Type</Button>
            :
            <Button appearance="subtle" icon={<EditRegular />} />
        }
      </PopoverTrigger>

      <PopoverSurface className={style.body}>
        <Field label="Type Name">
          <Input value={name} onChange={(_, e) => setName(e.value)} />
        </Field>

        <Button onClick={() => New ? run(VariantId, name, "") : run(VariantId, Type!, name)}>
          Submit
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
