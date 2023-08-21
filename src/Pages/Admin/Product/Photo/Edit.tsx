import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Image, Input, tokens } from "@fluentui/react-components";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductPhotoEdit() {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance="subtle"
          icon={<EditRegular />}
        />
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle action={
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<DismissRegular />} />
            </DialogTrigger>
          }>
            Image Detail
          </DialogTitle>

          <DialogContent style={{
            ...Flex,
            columnGap: tokens.spacingHorizontalL
          }}>
            <Image
              shape="rounded"
              style={{
                ...Cover,
                aspectRatio: "1",
                width: "50%"
              }}
              src={"https://picsum.photos/650"}
            />

            <div style={{
              ...ColFlex,
              flexGrow: 1,
              rowGap: tokens.spacingVerticalL
            }}>
              <Field label="Caption">
                <Input />
              </Field>

              <Button>Save Caption</Button>

              <Button>Replace</Button>

              <Button appearance="primary">Delete</Button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
