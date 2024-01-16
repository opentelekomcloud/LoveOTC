import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { Common } from "../Database";
import { SignalR } from "../SignalR";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.2
 */
export abstract class AdminNet extends SignalR {
  /** "|", "AdminNet" */
  protected static readonly Log = ["|", "AdminNet"];

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.2
   */
  public static readonly Hub = new HubConnectionBuilder()
    .withUrl(import.meta.env.DEV ? "https://localhost/AdminHub" : "/AdminHub",
      {
        ...import.meta.env.DEV ? {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        } : {},
        logMessageContent: import.meta.env.DEV,
        async accessTokenFactory() {
          const token = await Common.AccessToken();
          if (token) return token;
          throw new Error("Please Login First");
        },
      })
    .withAutomaticReconnect()
    .withStatefulReconnect()
    .withHubProtocol(new MessagePackHubProtocol())
    .configureLogging(import.meta.env.DEV ? LogLevel.Debug : LogLevel.Information)
    .build();

  /**
   * @author Aloento
   * @since 1.3.0
   * @version 0.1.0
   */
  public static override Index(key: string | number, methodName: string): string {
    return `${methodName}_Admin_${key}`;
  }
}
