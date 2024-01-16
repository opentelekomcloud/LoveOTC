import { useConst } from "@fluentui/react-hooks";
import { useLiveQuery } from "dexie-react-hooks";
import { IPersona } from "~/Components/ShopCart/Persona";
import { NotLoginError } from "~/Helpers/Exceptions";
import type { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { IConcurrency } from "../Database";
import { ShopNet } from "../ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export interface IUserGetMe extends IPersona, IConcurrency {
  Admin?: boolean;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export abstract class UserGet extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.4.0
   */
  public static useMe(pLog: Logger): IUserGetMe | void {
    const log = useConst(() => pLog.With("|", "Hub", "User", "Get", "Me"));
    const { dispatch } = useErrorToast(log);

    const res = useLiveQuery(() => this.GetVersionCache<IUserGetMe>(0, "UserGetMe")
      .catch(e => {
        if (e instanceof NotLoginError)
          log.info(e);
        else
          dispatch({
            Message: "Failed to Get Your Info",
            Error: e,
            Request: ""
          });
      }));

    return res;
  }
}
