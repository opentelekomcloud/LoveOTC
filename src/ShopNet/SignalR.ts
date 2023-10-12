import { HubConnectionState } from "@microsoft/signalr";
import type { AdminNet } from "./Admin/AdminNet";
import { AuthUser } from "./Database";
import type { ShopNet } from "./ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export class SignalR {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  public static EnsureConnected<T extends typeof ShopNet | typeof AdminNet>(this: T): Promise<void> {
    if (this.Hub.state === HubConnectionState.Connected) {
      return Promise.resolve();
    }

    if (this.Hub.state === HubConnectionState.Disconnected
      || this.Hub.state === HubConnectionState.Disconnecting) {
      return this.Hub.start();
    }

    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        if (this.Hub.state === HubConnectionState.Connected) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static EnsureLogin() {
    if (AuthUser?.expired) {
      throw new Error("Please Login First");
    }
  }
}
