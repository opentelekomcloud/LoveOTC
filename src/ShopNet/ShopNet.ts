import { HttpTransportType, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { AuthUser } from "./Database";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.1
 */
export class ShopNet {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static readonly Hub = new HubConnectionBuilder()
    .withUrl(import.meta.env.DEV ? "https://localhost/Hub" : "/Hub",
      {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        logMessageContent: import.meta.env.DEV,
        accessTokenFactory() {
          if (AuthUser)
            return AuthUser.access_token;

          return "";
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
  public static async EnsureConnected() {
    if (this.Hub.state === HubConnectionState.Disconnected
      || this.Hub.state === HubConnectionState.Disconnecting) {
      return this.Hub.start();
    }
  }

  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static EnsureLogin() {
    if (AuthUser?.expired)
      throw new Error("Please Login First");
  }
}
