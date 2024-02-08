import { HubConnectionState } from "@microsoft/signalr";
import dayjs, { Dayjs } from "dayjs";
import { Subject } from "rxjs";
import { EmptyResponseError, NotLoginError, NotTrueError } from "~/Helpers/Exceptions";
import type { Logger } from "~/Helpers/Logger";
import type { AdminNet } from "./Admin/AdminNet";
import { Common, Shared, type IConcurrency } from "./Database";
import type { ShopNet } from "./ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
type INet = typeof ShopNet | typeof AdminNet;

/**
 * @author Aloento
 * @since 1.0.0
 * @version 1.0.0
 */
export abstract class SignalR {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  protected static async EnsureConnected(this: INet): Promise<void> {
    if (this.Hub.state === HubConnectionState.Connected)
      return Promise.resolve();

    if (this.Hub.state === HubConnectionState.Disconnected
      || this.Hub.state === HubConnectionState.Disconnecting)
      await this.Hub.start();

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
  protected static async Invoke<T>(this: INet, methodName: string, ...args: any[]): Promise<T> {
    await this.EnsureConnected();
    return this.Hub.invoke<T>(methodName, ...args);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  protected static EnsureLogin(this: INet) {
    if (!Common.LocalUser || Common.LocalUser.expired)
      throw new NotLoginError();
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  protected static EnsureTrue(this: INet, res: boolean | null | undefined): asserts res is true {
    if (!res)
      throw new NotTrueError();
  }

  /**
   * @author Aloento
   * @since 1.3.0
   * @version 0.1.0
   */
  public static Index(key: string | number, methodName: string): string {
    return `${methodName}_${key}`;
  }

  /**
   * @author Aloento
   * @since 1.3.0
   * @version 0.1.0
   */
  protected static async UpdateCache<T>(
    this: INet, action: (raw: T) => T, key: string | number, methodName: string, exp?: Dayjs
  ) {
    const index = this.Index(key, methodName);
    const find = await Shared.Get<T & { QueryExp?: number }>(index);

    if (!find)
      return;

    const data = action(find);

    if (find.QueryExp)
      await Shared.Set<T & { QueryExp: number }>(index, {
        ...data,
        QueryExp: dayjs().add(1, "m").unix()
      }, dayjs().add(1, "w"));
    else
      await Shared.Set<T>(index, data, exp || null);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 1.0.0
   * @liveSafe
   */
  protected static async GetVersionCache<T extends IConcurrency>(
    this: INet, key: string | number, methodName: string
  ): Promise<T> {
    const index = this.Index(key, methodName);
    const find = await Shared.Get<T & { QueryExp: number }>(index);

    const update = async () => {
      const res = await Promise.resolve(this.Invoke<T | true | null>(methodName, key, find?.Version));

      if (res === true) {
        setCache(find!);
        return find!;
      }

      if (!res) {
        Shared.Sto.delete(index);
        throw new EmptyResponseError();
      }

      setCache(res);
      return res;
    }

    if (find) {
      if (find.QueryExp <= dayjs().unix())
        update();

      return find;
    }

    return update();

    function setCache(value: T) {
      Shared.Set<T & { QueryExp: number; }>(index, {
        ...value,
        QueryExp: dayjs().add(5, "s").unix()
      }, dayjs().add(1, "w"));
    }
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.2.0
   * @liveSafe
   * @deprecated
   */
  protected static async GetTimeCache<T>(
    this: INet, key: string | number, methodName: string, exp: (now: Dayjs) => Dayjs, ...args: any[]
  ): Promise<T> {
    const res = await Shared.GetOrSet(
      this.Index(key, methodName),
      async () => {
        const db = await this.Invoke<T>(methodName, ...args);
        return db;
      },
      exp(dayjs())
    );

    return res;
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.2
   */
  protected static async HandleFileStream(this: INet, file: File, subject: Subject<Uint8Array>, pLog: Logger) {
    const chunkSize = 30 * 1024;
    const chunks = Math.ceil(file.size / chunkSize);
    let index = 0;

    while (index < chunks) {
      const start = index * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const reader = new FileReader();
      const buffer = await new Promise<Uint8Array>((res, rej) => {
        reader.onload = () => res(new Uint8Array(reader.result as ArrayBuffer));
        reader.onerror = () => rej(reader.error);
        reader.readAsArrayBuffer(chunk);
      });

      subject.next(buffer);
      pLog?.debug(`Sent chunk ${index + 1}/${chunks}`);
      index++;
    }

    subject.complete();
  }
}
