import { HubConnectionState } from "@microsoft/signalr";
import dayjs, { Dayjs } from "dayjs";
import { AdminNet } from "./Admin/AdminNet";
import { Common, IConcurrency, Shared } from "./Database";
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
    if (!Common.LocalUser || Common.LocalUser.expired)
      throw new Error("Please Login First");
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.0
   */
  protected static async WithVersionCache<T extends SubClass, TRes extends IConcurrency>(
    this: T, key: string | number, methodName: string
  ): Promise<TRes | void> {
    const index = `${methodName}_${key}`;
    const find = await Shared.Get<TRes & { QueryExp: number }>(index);

    if (find && find.QueryExp > dayjs().unix())
      return find;

    await this.EnsureConnected();
    const res = await this.Hub.invoke<TRes | true | null>(methodName, key, find?.Version);

    if (res === true) {
      Shared.Set<TRes & { QueryExp: number }>(index, {
        ...find!,
        QueryExp: dayjs().add(1, "m").unix()
      }, null);

      return find!;
    }

    if (!res)
      return Shared.Sto.delete(index);

    Shared.Set<TRes & { QueryExp: number }>(index, {
      ...res,
      QueryExp: dayjs().add(1, "m").unix()
    }, null);

    return res;
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  protected static async WithTimeCache<T extends SubClass, TRes>(
    this: T, key: string | number, methodName: string, exp: Dayjs, ...args: any[]
  ): Promise<TRes> {
    const res = await Shared.GetOrSet(
      `${methodName}_${key}`,
      async () => {
        await this.EnsureConnected();
        const db = await this.Hub.invoke<TRes>(methodName, ...args);
        return db;
      },
      exp
    );

    return res;
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.0
   */
  protected static async FindCover(photos: number[], prodId?: number): Promise<string | void> {
    const list = [];

    for (const photoId of photos) {
      const { ProductEntity } = await import("./Product/Entity")
      const photo = await ProductEntity.Photo(photoId);

      if (photo) {
        list.push(photo);

        if (photo.Cover)
          return photo.ObjectId;
      } else
        console.warn(`Photo ${photoId} not found in Product ${prodId}`);
    }

    if (list.length > 0) {
      console.warn(`Product ${prodId} has no cover photo, using first photo instead`);
      return list.sort((a, b) => a.Order - b.Order)[0].ObjectId;
    }
  }
}
