import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";

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
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            exercitationem cumque repellendus eaque est dolor eius expedita
            nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
            in natus iure cumque eaque?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
