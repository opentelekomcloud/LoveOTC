import { Button, Popover, PopoverSurface, PopoverTrigger, Toast, ToastTitle, makeStyles, tokens } from "@fluentui/react-components";
import { useRouter } from "~/Components/Router";
import { Logger } from "~/Helpers/Logger";
import { ColFlex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { AdminHub } from "~/ShopNet/Admin";

const log = new Logger("Admin", "Product", "Detail", "Delete");

const useStyles = makeStyles({
  root: {
    ...ColFlex,
    rowGap: tokens.spacingHorizontalS
  }
});

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.2.1
 */
export function AdminProductDelete({ ProdId }: { ProdId: number }) {
  const { Nav } = useRouter();
  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run, loading } = AdminHub.Product.Delete.useProduct({
    onError(e, params) {
      dispatch({
        Message: "Failed Delete Product",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Product Deleted</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      Nav("/Admin");
    }
  });

  const style = useStyles();

  return (
    <div>
      <Popover withArrow>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Delete Product</Button>
        </PopoverTrigger>

        <PopoverSurface className={style.root}>
          Are You Sure?

          <Button
            disabled={loading}
            appearance="primary"
            onClick={() => run(ProdId)}
          >
            Yes
          </Button>
        </PopoverSurface>
      </Popover>
    </div>
  )
}
