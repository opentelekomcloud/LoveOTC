import { useConst } from "@fluentui/react-hooks";
import { IPersona } from "~/Components/ShopCart/Persona";
import { EmptyResponseError, NotLoginError } from "~/Helpers/Exceptions";
import type { Logger } from "~/Helpers/Logger";
import { useSWR } from "~/Helpers/useSWR";
import { useErrorToast } from "~/Helpers/useToast";
import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

export namespace UserGet {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.2.0
   */
  export interface Me extends IPersona, IConcurrency {
    Admin?: boolean;
  }
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export abstract class UserGet extends ShopNet {
  /** "User", "Get" */
  protected static override readonly Log = [...super.Log, "User", "Get"];

  public static readonly me = "UserGetMe";
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.5.0
   */
  public static useMe(pLog: Logger, admin?: true) {
    const log = useConst(() => pLog.With(...this.Log, "Me"));
    const { dispatch } = useErrorToast(log);

    const req = useSWR(this.me, () => {
      this.EnsureLogin();
      return this.GetVersionCache<UserGet.Me>(0, this.me);
    }, {
      manual: admin,
      useMemory: true,
      onError(e) {
        if (e instanceof EmptyResponseError)
          return;
        else if (e instanceof NotLoginError)
          log.info(e);
        else
          dispatch({
            Message: "Failed to Get Your Info",
            Error: e as Error,
            Request: ""
          });
      }
    });

    return req;
  }
}
