import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, Label, Toast, ToastBody, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
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
  New?: true;
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
  one: {
    ...Flex,
    columnGap: tokens.spacingVerticalXXXL
  },
});

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
export function Setting({ Open, Toggle, New }: ISetting) {
  const style = useStyles();
  const auth = useAuth();

  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();

  useRequest(Hub.User.Get.Me.bind(Hub.User.Get), {
    manual: New,
    onSuccess({ Name, Address, Phone }) {
      setName(Name);
      setPhone(Phone);
      setAddress(Address);
    }
  });

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(Hub.User.Post.Update.bind(Hub.User.Post), {
    manual: true,
    onFinally([req], _, e) {
      if (e)
        dispatchError({
          Message: `Failed ${New ? "Create" : "Update"} Info`,
          Error: e,
          Request: req
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Info {New ? "Created" : "Updated"}</ToastTitle>
          <ToastBody>
            {req.Name}
            <br />
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
    <Dialog open={Open} onOpenChange={Toggle} modalType={New ? "alert" : "modal"}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{New ? "Welcome! Fill in your info to get started." : "Personal Information"}</DialogTitle>

          <DialogContent className={style.box}>
            <div className={style.one}>
              <Field label="Name" size="large" required>
                <Input size="medium" value={name} maxLength={20} onChange={(_, v) => setName(v.value)} />
              </Field>

              <Field label="Phone" size="large" required>
                <Input size="medium" value={phone} maxLength={20} onChange={(_, v) => setPhone(v.value)} />
              </Field>
            </div>

            <Field label="E-Mail" size="large">
              <Label>{auth.user?.profile.email}</Label>
            </Field>

            <Field label="Address" size="large" required>
              <Input size="medium" value={address} maxLength={100} onChange={(_, v) => setAddress(v.value)} />
            </Field>
          </DialogContent>

          <DialogActions>
            {!New && (
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
            )}

            <Button appearance="primary" onClick={() => run({
              UId: auth.user?.profile.sub,
              EMail: auth.user?.profile.email,
              Name: name,
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
