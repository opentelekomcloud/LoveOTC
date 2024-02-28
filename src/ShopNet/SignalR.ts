import { useConst } from "@fluentui/react-hooks";
import { HubConnectionState } from "@microsoft/signalr";
import { Options } from "ahooks/lib/useRequest/src/types";
import dayjs, { Dayjs } from "dayjs";
import Dexie from "dexie";
import { Subject } from "rxjs";
import { EmptyResponseError, NotLoginError, NotTrueError } from "~/Helpers/Exceptions";
import type { Logger } from "~/Helpers/Logger";
import { useSWR } from "~/Helpers/useSWR";
import type { AdminNet } from "./Admin/AdminNet";
import { Common, Shared, type IConcurrency } from "./Database";
import type { ShopNet } from "./ShopNet";

export namespace SignalR {
  export type INet = typeof ShopNet | typeof AdminNet;
}

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
  protected static async EnsureConnected(this: SignalR.INet): Promise<void> {
    if (this.Hub.state === HubConnectionState.Connected)
      return Promise.resolve();

    if (this.Hub.state === HubConnectionState.Disconnected
      || this.Hub.state === HubConnectionState.Disconnecting)
      await this.Hub.start();

    return new Promise<void>(res => {
      const i = setInterval(() => {
        if (this.Hub.state === HubConnectionState.Connected) {
          clearInterval(i);
          res();
        }
      }, 100);
    });
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  protected static async Invoke<T>(this: SignalR.INet, methodName: string, ...args: any[]): Promise<T> {
    await this.EnsureConnected();
    return this.Hub.invoke<T>(methodName, ...args);
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.1
   */
  protected static EnsureLogin(this: SignalR.INet) {
    if (!Common.LocalUser || Common.LocalUser.expired)
      throw new NotLoginError();
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  protected static EnsureTrue(this: SignalR.INet, res: boolean | null | undefined): asserts res is true {
    if (!res)
      throw new NotTrueError();
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.2
   */
  protected static async HandleFileStream(this: SignalR.INet, file: File, subject: Subject<Uint8Array>, pLog: Logger) {
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

  //#region Cache

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
   * @since 1.3.5
   * @version 0.1.0
   */
  protected static readonly reqPool = new Set<string>();

  /**
   * @author Aloento
   * @since 1.3.5
   * @version 0.1.0
   */
  protected static async getLocker(key: string) {
    if (this.reqPool.has(key))
      return new Promise<void>(res => {
        const t = setTimeout(() => this.reqPool.delete(key), 10000);

        const i = setInterval(() => {
          if (!this.reqPool.has(key)) {
            clearInterval(i);
            res();
            clearTimeout(t);
          }
        }, 100);
      });
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 1.1.0
   * @liveSafe
   */
  protected static async GetVersionCache<T extends IConcurrency>(
    this: SignalR.INet, key: string | number, methodName: string
  ): Promise<T> {
    const index = this.Index(key, methodName);
    await this.getLocker(index);

    const find = await Shared.Get<T & { QueryExp: number }>(index);

    const get = async () => {
      this.reqPool.add(index);

      const res = await Dexie.waitFor(this.Invoke<T | true | null>(methodName, key, find?.Version));

      const set = (value: T) => {
        Shared.Set<T & { QueryExp: number; }>(
          index,
          {
            ...value,
            QueryExp: dayjs().add(10, "s").unix()
          }, dayjs().add(1, "w")
        ).finally(
          () => this.reqPool.delete(index)
        );
      }

      if (res === true) {
        set(find!);
        return find!;
      }

      if (!res) {
        Shared.Sto.delete(index);
        throw new EmptyResponseError();
      }

      set(res);
      return res;
    }

    if (find) {
      if (find.QueryExp < dayjs().unix())
        get();

      return find;
    }

    return get();
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.3.0
   * @liveSafe
   * @deprecated Use {@link useTimeCache} if possible.
   */
  protected static async GetTimeCache<T>(
    this: SignalR.INet, key: string | number, methodName: string, exp: (now: Dayjs) => Dayjs, ...args: any[]
  ): Promise<T> {
    const index = this.Index(key, methodName);
    await this.getLocker(index);

    const res = await Shared.GetOrSet(
      index,
      () => {
        this.reqPool.add(index);
        return this.Invoke<T>(methodName, ...args);
      },
      exp(dayjs())
    ).finally(
      () => this.reqPool.delete(index)
    );

    return res;
  }

  /**
   * @author Aloento
   * @since 1.3.5
   * @version 0.1.0
   */
  protected static useTimeCache<T>(
    this: SignalR.INet, key: string | number, methodName: string, options: Options<T, any[]>
  ) {
    const index = useConst(() => this.Index(key, methodName));

    const req = useSWR(
      index,
      (...params) => this.Invoke<T>(methodName, ...params),
      options
    );

    return req;
  }

  /**
   * @author Aloento
   * @since 1.3.0
   * @version 0.1.0
   * @deprecated
   */
  protected static async UpdateCache<T>(
    this: SignalR.INet, action: (raw: T) => T, key: string | number, methodName: string, exp?: Dayjs
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

  //#endregion
}
