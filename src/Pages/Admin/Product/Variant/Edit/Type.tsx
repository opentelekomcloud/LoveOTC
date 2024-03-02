import { Button, Field, Input, Popover, PopoverSurface, PopoverTrigger, Toast, ToastBody, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, EditRegular } from "@fluentui/react-icons";
import { useBoolean } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
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

const log = new Logger("Admin", "Product", "Detail", "Variant", "Edit", "Type");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
interface IAdminProductType {
  VariantId: number;
  TypeId?: number;
  New?: true;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
export function AdminProductType({ VariantId, TypeId, New }: IAdminProductType) {
  const style = useStyles();
  const [open, { toggle }] = useBoolean();

  const [name, setName] = useState("");
  Hub.Product.Get.useType(TypeId!, {
    manual: New,
    onSuccess(data) {
      setName(data.Name);
    },
    onError: log.error
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

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

      setName("");
      toggle();
    }
  }

  const { run: post, loading: loadingN } = AdminHub.Product.Post.useType(VariantId, options);

  const { run: patch, loading } = AdminHub.Product.Patch.useType(TypeId!, options);

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

        <Button
          disabled={loading || loadingN}
          onClick={() => New ? post(name) : patch(name)}
        >
          Submit
        </Button>
      </PopoverSurface>
    </Popover>
  );
}
