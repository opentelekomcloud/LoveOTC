import { Logger } from "~/Helpers/Logger";
import { AdminNet } from "../AdminNet";

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.1.0
 */
export abstract class AdminOrderExport extends AdminNet {
  /**
   * @author Aloento
   * @since 1.3.5
   * @version 0.1.0
   */
  public static async Export(plog: Logger): Promise<string> {
    this.EnsureLogin();
    await this.EnsureConnected();

    const slice: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
      this.Hub.stream<Uint8Array>("ExportOrder").subscribe({
        error(err) {
          plog.error(err);
          reject(err);
        },
        next(value) {
          slice.push(value);
          plog.debug("Received Slice", slice.length);
        },
        complete() {
          plog.debug("Received All Slices", slice.length);
          resolve(URL.createObjectURL(new Blob(slice)));
        },
      });
    });
  }
}
