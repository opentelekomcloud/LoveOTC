import { IStreamResult } from "@microsoft/signalr";
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
   * @version 0.1.0
   */
  public static async Get(objId: string): Promise<IStreamResult<Uint8Array>> {
    await this.EnsureConnected();
    return this.Hub.stream<Uint8Array>("ObjectStorageGet", objId);
  }
}
