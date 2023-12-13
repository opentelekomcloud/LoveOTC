import { Button, Field, Input, Popover, PopoverSurface, PopoverTrigger, Toast, ToastBody, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, EditRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { useState } from "react";
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

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.1
 */
export function AdminProductType({ VariantId, Type, Refresh, New }: { VariantId: number; Type?: string; Refresh: () => void; New?: true }) {
  const style = useStyles();
  const [open, { toggle }] = useBoolean();
  const [name, setName] = useState(Type || "");

  const { dispatch, dispatchToast } = useErrorToast();

  const options: Options<any, any> = {
    manual: true,
    onError(e, req) {
      dispatch({
        Message: `Failed ${New ? "Create" : "Update"} Type ${name}`,
        Request: req,
        Error: e
      });
    },
    onSuccess(data) {
      dispatchToast(
        <Toast>
          <ToastTitle>Type {New ? "Created" : "Updated"}</ToastTitle>
          <ToastBody>{data} {name}</ToastBody>
        </Toast>,
        { intent: "success" }
      );

      Refresh();
      setName("");
      toggle();
    }
  }

  const { run: post } = AdminHub.Product.Post.useType(options);

  const { run: patch } = AdminHub.Product.Patch.useType(options);

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

        <Button onClick={() => New ? post(VariantId, name) : patch(VariantId, Type!, name)}>
          Submit
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
