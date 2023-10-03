import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, Label, Toast, ToastBody, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { use500Toast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
interface ISetting {
  Open: boolean;
  Toggle: () => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  box: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalM
  },
  flex: Flex,
  one: {
    ...ColFlex,
    flexBasis: "50%",
    rowGap: tokens.spacingVerticalM
  },
  col: ColFlex,

});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.2
 */
export function Setting({ Open, Toggle }: ISetting) {
  const style = useStyles();

  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();

  const { data } = useRequest(Hub.User.Get.Me, {
    onSuccess({ Address, Phone }) {
      setPhone(Phone);
      setAddress(Address);
    }
  });

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(Hub.User.Post.Update, {
    manual: true,
    onFinally([req], _, e) {
      if (e)
        dispatchError({
          Message: "Failed Update Info",
          Error: e,
          Request: req
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Info Updated</ToastTitle>
          <ToastBody>
            {req.Phone}
            <br />
            {req.Address}
          </ToastBody>
        </Toast>,
        { intent: "success" }
      );

      Toggle();
    },
  });

  return (
    <Dialog open={Open} onOpenChange={Toggle}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Personal Information</DialogTitle>

          <DialogContent className={style.box}>
            <div className={style.flex}>
              <div className={style.one}>
                <Field label="Name" size="large">
                  <Label>{data?.Name}</Label>
                </Field>

                <Field label="E-Mail" size="large">
                  <Label>{data?.EMail}</Label>
                </Field>
              </div>

              <Field label="Phone" size="large" required className={style.col}>
                <Input size="medium" value={phone} maxLength={20} onChange={(_, v) => setPhone(v.value)} />
              </Field>
            </div>

            <Field label="Address" size="large" required>
              <Input size="medium" value={address} maxLength={100} onChange={(_, v) => setAddress(v.value)} />
            </Field>
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={() => run({
              Address: address,
              Phone: phone
            })}>
              Submit
            </Button>
          </DialogActions>

        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
