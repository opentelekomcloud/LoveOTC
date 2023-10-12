import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { AuthUser } from "../Database";
import { SignalR } from "../SignalR";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export class AdminNet extends SignalR {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static readonly Hub = new HubConnectionBuilder()
    .withUrl(import.meta.env.DEV ? "https://localhost/AdminHub" : "/AdminHub",
      {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        logMessageContent: import.meta.env.DEV,
        accessTokenFactory() {
          if (AuthUser?.expired === false)
            return AuthUser.access_token;

          throw new Error("Please Login First");
        },
      })
    .withAutomaticReconnect()
    .withHubProtocol(new MessagePackHubProtocol())
    .configureLogging(import.meta.env.DEV ? LogLevel.Debug : LogLevel.Information)
    .build();

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static async EnsureAdmin() {
    this.EnsureLogin();
    await this.EnsureConnected();
  }
}
