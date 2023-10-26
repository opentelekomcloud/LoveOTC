import { HubConnectionState } from "@microsoft/signalr";
import { AdminNet } from "./Admin/AdminNet";
import { Auth, IConcurrency, Shared } from "./Database";
import { ShopNet } from "./ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
type SubClass = typeof ShopNet | typeof AdminNet;

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
type Dynamic<T> = T | true | null;

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export abstract class SignalR {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  public static EnsureConnected<T extends SubClass>(this: T): Promise<void> {
    if (this.Hub.state === HubConnectionState.Connected)
      return Promise.resolve();

    if (this.Hub.state === HubConnectionState.Disconnected
      || this.Hub.state === HubConnectionState.Disconnecting)
      return this.Hub.start();

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
    if (!Auth.User || Auth.User.expired)
      throw new Error("Please Login First");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  protected static async WithVersionCache<T extends SubClass, TRes extends IConcurrency>(
    this: T, key: string | number, methodName: string
  ): Promise<TRes | void> {
    const index = `${methodName}_${key}`;
    const find = await Shared.Get<TRes>(index);

    await this.EnsureConnected();
    const res = await this.Hub.invoke<Dynamic<TRes>>(methodName, key, find?.Version);

    if (res === true)
      return find!;

    if (res === null)
      return Shared.Sto.delete(index);

    Shared.Set(index, res, null);
    return res;
  }
}
