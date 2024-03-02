import { useConst } from "@fluentui/react-hooks";
import { IStreamResult } from "@microsoft/signalr";
import { Logger } from "~/Helpers/Logger";
import { useSWR } from "~/Helpers/useSWR";
import { Shared } from "./Database";
import { ShopNet } from "./ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.1
 */
export class ObjectStorage extends ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.0
   */
  public static async Get(objId: string): Promise<IStreamResult<Uint8Array>> {
    if (!/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(objId))
      throw new Error(`Invalid ObjectId ${objId}`);

    await this.EnsureConnected();
    return this.Hub.stream<Uint8Array>("ObjectStorageGet", objId);
  }

  /**
   * @author Aloento
   * @since 1.4.0
   * @version 0.1.0
   */
  public static useGet(objId: string, pLog: Logger) {
    const log = useConst(() => pLog.With("GuidImage"));

    const req = useSWR(objId, (id) => this.GetBySlice(id, log), {
      onError: log.error,
      defaultParams: [objId],
      useMemory: true
    });

    return req;
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.2
   */
  public static GetBySlice(objId: string, logger: Logger): Promise<Uint8Array[]> {
    const slice: Uint8Array[] = [];

    return Shared.GetOrSet(objId, () => new Promise(
      (resolve, reject) => {
        this.Get(objId).then(x =>
          x.subscribe({
            error(err) {
              reject(err);
            },
            next(value) {
              slice.push(value);
              logger.debug("Received Slice", objId, slice.length);
            },
            complete() {
              resolve(slice);
            },
          })
        );
      })
    );
  }
}
