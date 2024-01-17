/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export class NotLoginError extends Error {
  public constructor() {
    super("Please Login First");
  }
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export class NotTrueError extends Error {
  public constructor() {
    super("Server Returned False");
  }
}

/**
 * @author Aloento
 * @since 1.3.0
 * @version 0.1.0
 */
export class EmptyResponseError extends Error {
  public constructor() {
    super("Server Returned Empty Response");
  }
}
