import { Text, Toast, ToastBody, ToastTitle, makeStyles, useToastController } from "@fluentui/react-components";
import type { Logger } from "./Logger";
import { PreLine } from "./Styles";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  pre: PreLine,
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface Cause<T = any> {
  Message: string
  Request: T;
  Error: Error;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.3
 */
export function useErrorToast<T>(log: Logger) {
  const style = useStyles();
  const { dispatchToast } = useToastController();

  return {
    dispatch: (e: Cause<T>) => {
      const oMsg = e.Error.message;
      const pos = oMsg.indexOf("Exception:");

      let nMsg = oMsg;
      if (pos !== -1)
        nMsg = oMsg.substring(pos + 10);

      dispatchToast(
        <Toast>
          <ToastTitle>Internal Error</ToastTitle>

          <ToastBody subtitle={
            <Text className={style.pre}>
              {nMsg}
              <br />
              More Info, See Console
            </Text>
          }>

            <Text className={style.pre}>
              {e.Message}
            </Text>

          </ToastBody>
        </Toast>,
        { intent: "error", timeout: 10000 }
      );

      log.error(e);
    },
    dispatchToast
  };
}
