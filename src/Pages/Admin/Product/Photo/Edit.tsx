import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, makeStyles, tokens } from "@fluentui/react-components";
import { DismissRegular, EditRegular } from "@fluentui/react-icons";
import { GuidImage } from "~/Helpers/GuidImage";
import { Logger } from "~/Helpers/Logger";
import { ColFlex, Cover, Flex } from "~/Helpers/Styles";
import { IPhotoItem } from ".";
import { AdminProductPhotoEditCaption } from "./Caption";
import { AdminProductPhotoEditDelete } from "./Delete";
import { AdminProductPhotoEditReplace } from "./Replace";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  box: {
    ...Flex,
    columnGap: tokens.spacingHorizontalL
  },
  img: {
    ...Cover,
    aspectRatio: "1",
    width: "50%"
  },
  cap: {
    ...ColFlex,
    flexGrow: 1,
    rowGap: tokens.spacingVerticalL
  }
});

const log = new Logger("Admin", "Product", "Detail", "Photo", "Edit");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 1.0.0
 */
export function AdminProductPhotoEdit(props: IPhotoItem) {
  const { Id, Cover } = props;
  const style = useStyles();

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

          <DialogContent className={style.box}>
            <GuidImage
              shape="rounded"
              className={style.img}
              Guid={Cover}
              Log={log}
            />

            <div className={style.cap}>
              <AdminProductPhotoEditCaption {...props} />

              <AdminProductPhotoEditReplace Id={Id} />

              <AdminProductPhotoEditDelete {...props} />
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
