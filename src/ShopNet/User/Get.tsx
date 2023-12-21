import { Toast, ToastTitle } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import type { Options } from "ahooks/lib/useRequest/src/types";
import { NotLoginError } from "~/Helpers/Exceptions";
import type { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

interface IuseMe extends IConcurrency {
  Name: string;
  EMail: string;
  Phone: string;
  Address: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export abstract class UserGet extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.1
   */
  public static useMe(pLog: Logger, options?: Options<IuseMe | void, []>, suppress: boolean = true) {
    const log = useConst(() => pLog.With("|", "Hub", "User", "Get", "Me"));
    const { dispatch, dispatchToast } = useErrorToast(log);

    return useRequest(() => {
      this.EnsureLogin();
      return this.WithVersionCache<IuseMe>(0, "UserGetMe");
    }, {
      ...options,
      onError: (e, req) => {
        if (e instanceof NotLoginError) {
          if (suppress)
            log.debug(e);
          else
            dispatchToast(
              <Toast>
                <ToastTitle>{e.message}</ToastTitle>
              </Toast>,
              { intent: "warning", timeout: 5000 }
            );
        } else
          dispatch({
            Message: "Failed to Get Your Info",
            Error: e,
            Request: req
          })
      }
    });
  }
}
