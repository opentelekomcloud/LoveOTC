import dayjs, { Dayjs } from "dayjs";
import Dexie from "dexie";

/**
 * 缓存实体
 *
 * @author Aloento
 * @since 0.3.1 MusiLand
 * @version 0.2.1
 */
interface ITable<T> {
  Id: string;
  Exp: number | string | null;
  Val: NonNullable<T>;
}

/**
 * 数据表操作工具
 *
 * @author Aloento
 * @since 0.3.1 MusiLand
 * @version 0.2.1
 */
export class Table<TPre = any> {
  public readonly Sto: Dexie.Table<ITable<TPre>, string>;

  public constructor(public readonly DB: Dexie, public readonly Name: string) {
    this.Sto = DB.table(Name);
    this.Trim();
  }

  /**
   * 按完整 key 获取
   *
   * @author Aloento
   * @since 0.1.0 MusiLand
   * @version 0.2.0
   * @param cancel 对象失效规则
   */
  public async Get<T extends TPre = TPre>(key: string, cancel?: (x?: ITable<T>) => Promise<boolean>): Promise<T | null> {
    const find = await this.Sto.get(key) as ITable<T> | undefined;

    if (find) {
      if ((cancel && await cancel(find)) ||
        (typeof find.Exp === "number" && find.Exp < dayjs().unix())) {
        await this.Sto.delete(key);
        return null;
      }

      return find.Val;
    }

    return null;
  }

  /**
   * 获取或者创建
   *
   * @author Aloento
   * @since 0.1.0 MusiLand
   * @version 0.2.0
   * @param fac 内容生成工厂
   * @param exp 过期时间
   * @returns 工厂创建的结果
   */
  public async GetOrSet<T extends TPre = TPre>(
    key: string,
    fac: () => Promise<T>,
    exp?: Dayjs | null,
    cancel?: (x?: ITable<T>) => Promise<boolean>
  ): Promise<T> {
    const res = await this.Get<T>(key, cancel);
    if (res) return res;
    return this.Set<T>(key, await fac(), exp);
  }

  /**
   * 存储，已存在时会替换
   * 默认有一月的过期时间，但也可以设置为 null
   * 高并发时不能保证 key 唯一
   *
   * @author Aloento
   * @since 0.1.0 MusiLand
   * @version 0.2.0
   * @param exp 过期Token
   * @returns val
   */
  public async Set<T extends TPre = TPre>(id: string, val: T, exp?: Dayjs | null): Promise<T> {
    if (!val)
      throw `val is null or undefined`;

    if (exp === null) {
      await this.Sto.put({
        Id: id, Exp: exp,
        Val: val
      });

      return val;
    }

    const time = (exp || dayjs().add(1, "M")).unix();
    if (exp && time < dayjs().unix())
      throw "The expiration time cannot be less than the current time";

    await this.Sto.put({
      Id: id, Exp: time,
      Val: val
    });

    return val;
  }

  /**
   * 清理过期的缓存
   *
   * @author Aloento
   * @since 0.3.0 MusiLand
   * @version 0.2.0
   */
  public Trim() {
    return this.Sto.filter(x => {
      return typeof x.Exp === "number" && x.Exp < dayjs().unix();
    }).delete();
  }
}
