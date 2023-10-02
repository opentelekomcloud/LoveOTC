/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export class WarpError<T = any> extends Error implements Cause<T> {
  public readonly Request: T;
  public readonly Error: Error;

  public override get cause() {
    return null as never;
  }

  public constructor({ Message, Request, Error }: Cause & { Message: string }) {
    super();
    this.message = Message;
    this.Request = Request;
    this.Error = Error;
  }
}

interface Cause<T = any> {
  Request: T;
  Error: Error;
}
