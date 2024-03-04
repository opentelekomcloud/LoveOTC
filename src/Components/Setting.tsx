import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, Toast, ToastBody, ToastTitle, Tooltip, makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Logger } from "~/Helpers/Logger";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { OnNewUserSubject } from "./NewUser";

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

const log = new Logger("Setting");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.8.0
 */
export function Setting({ Open, Toggle, New }: ISetting) {
  const style = useStyles();
  const auth = useAuth();

  const [surname, setSurname] = useState<string>();
  const [forename, setForename] = useState<string>();

  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();

  const { data, mutate } = Hub.User.Get.useMe(log);

  useEffect(() => {
    if (New || !data) return;

    const { Surname, Forename, Phone, Address } = data;

    setSurname(Surname);
    setForename(Forename);
    setPhone(Phone);
    setAddress(Address);
  }, [data]);

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = Hub.User.Post.useUpdate({
    manual: true,
    onError(e, [req]) {
      dispatch({
        Message: `Failed ${New ? "Create" : "Update"} Info`,
        Error: e,
        Request: req
      });
    },
    onSuccess(_, [req]) {
      mutate({
        ...data!,
        ...req
      });

      dispatchToast(
        <Toast>
          <ToastTitle>Info {New ? "Created" : "Updated"}</ToastTitle>
          <ToastBody>
            {req.Surname}, {req.Forename}
            <br />
            {req.Phone}
            <br />
            {req.Address}
          </ToastBody>
        </Toast>,
        { intent: "success" }
      );

      if (New) {
        OnNewUserSubject.next(false);
        OnNewUserSubject.complete();
        OnNewUserSubject.closed = true;
      }

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
              <Tooltip
                content="Surname, for shipping label"
                relationship="description"
                withArrow
              >
                <Field label="Family Name" size="large" required>
                  <Input size="medium" value={surname} maxLength={20} onChange={(_, v) => setSurname(v.value)} />
                </Field>
              </Tooltip>

              <Tooltip
                content="Forename, for shipping label"
                relationship="description"
                withArrow
              >
                <Field label="Given Name" size="large" required>
                  <Input size="medium" value={forename} maxLength={20} onChange={(_, v) => setForename(v.value)} />
                </Field>
              </Tooltip>
            </div>

            <div className={style.one}>
              <Tooltip
                content="Up to 20 digits, starting with an internation access code"
                relationship="description"
                withArrow
              >
                <Field label="Phone" size="large" required>
                  <Input size="medium" value={phone} maxLength={20} onChange={(_, v) => setPhone(v.value)} />
                </Field>
              </Tooltip>

              <Tooltip
                content={`Your company email, ${auth.user?.profile.email}`}
                relationship="description"
                withArrow
              >
                <Field label="E-Mail" size="large">
                  <Input size="medium" value={auth.user?.profile.email} disabled />
                </Field>
              </Tooltip>
            </div>

            <Tooltip
              content="Your full shipping address including street, number, ZIP, town and country. Separate lines by commas"
              relationship="description"
              withArrow
            >
              <Field label="Address" size="large" required>
                <Input size="medium" value={address} maxLength={100} minLength={20} onChange={(_, v) => setAddress(v.value)} />
              </Field>
            </Tooltip>
          </DialogContent>

          <DialogActions>
            {!New && (
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
            )}

            <Button appearance="primary" onClick={() => run({
              EMail: auth.user?.profile.email,
              Surname: surname,
              Forename: forename,
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
