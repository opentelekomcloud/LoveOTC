import { Text, Toast, ToastBody, ToastTitle, makeStyles, useToastController } from "@fluentui/react-components";
import { WarpError } from "./Error";
import { PreLine } from "./Styles";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const useStyles = makeStyles({
  pre: PreLine,
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function use500Toast() {
  const style = useStyles();
  const { dispatchToast } = useToastController();

  return (e: WarpError) => {
    dispatchToast(
      <Toast>
        <ToastTitle>Internal Error</ToastTitle>

        <ToastBody subtitle={
          <Text className={style.pre}>
            {e.Error.message}
            <br />
            More Info, See Console
          </Text>
        }>

          <Text className={style.pre}>
            {e.message}
          </Text>

        </ToastBody>
      </Toast>,
      { intent: "error", timeout: 5000 }
    );

    console.error(e.Error);
    throw e.Request;
  };
}
