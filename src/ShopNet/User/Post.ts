/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IPostPersona {
  Phone?: string;
  Address?: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class UserPost {
  /**
   * @author Aloento
   * @since 0.5.0
   * @version 0.1.0
   */
  public static async Update(req: IPostPersona): Promise<true> {
    throw new Error("some");
  }
}
