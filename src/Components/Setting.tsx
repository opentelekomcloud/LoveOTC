import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, Label, tokens } from "@fluentui/react-components";
import { ColFlex, Flex } from "~/Helpers/Styles";

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
 * @since 0.1.0
 * @version 0.1.0
 */
export function Setting({ Open, Toggle }: ISetting) {
  return (
    <Dialog open={Open} onOpenChange={Toggle}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Personal Information</DialogTitle>

          <DialogContent style={{
            ...ColFlex,
            rowGap: tokens.spacingVerticalM
          }}>
            <div style={Flex}>
              <div style={{
                ...ColFlex,
                flexBasis: "50%",
                rowGap: tokens.spacingVerticalM
              }}>
                <Field label="Name" size="large">
                  <Label>Aloento</Label>
                </Field>

                <Field label="E-Mail" size="large">
                  <Label>Aloento</Label>
                </Field>
              </div>

              <div style={{
                ...ColFlex,
                flexBasis: "50%",
                rowGap: tokens.spacingVerticalM
              }}>
                <Field label="Phone" size="large">
                  <Label>Aloento</Label>
                </Field>

                <Field label="What" size="large">
                  <Label>Placeholder</Label>
                </Field>
              </div>
            </div>

            <Field label="Address" size="large">
              <Input />
            </Field>
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button appearance="primary">Submit</Button>
          </DialogActions>

        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
