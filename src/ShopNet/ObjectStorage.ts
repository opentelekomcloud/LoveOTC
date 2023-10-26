import { IStreamResult } from "@microsoft/signalr";
import { Shared } from "./Database";
import { ShopNet } from "./ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
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
   * @since 1.0.0
   * @version 0.2.0
   */
  public static GetBySlice(objId: string): Promise<Uint8Array[]> {
    const slice: Uint8Array[] = [];

    return Shared.GetOrSet(objId, () => new Promise(
      (resolve, reject) => {
        ObjectStorage.Get(objId).then(x =>
          x.subscribe({
            error(err) {
              reject(err);
            },
            next(value) {
              slice.push(value);
              console.debug("Received Slice", objId, slice.length);
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
