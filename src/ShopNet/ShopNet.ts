import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { OnNewUserSubject } from "~/Components/NewUser";
import { Common } from "./Database";
import { SignalR } from "./SignalR";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.1
 */
export abstract class ShopNet extends SignalR {
  /**
   * @author Aloento
   * @since 1.0.0
   * @version 0.1.0
   */
  public static readonly Hub = new HubConnectionBuilder()
    .withUrl(import.meta.env.DEV ? "https://localhost/Hub" : "/Hub",
      {
        ...import.meta.env.DEV ? {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        } : {},
        logMessageContent: import.meta.env.DEV,
        async accessTokenFactory() {
          const token = await Common.AccessToken();
          if (token) return token;
          return "";
        },
      })
    .withAutomaticReconnect()
    .withHubProtocol(new MessagePackHubProtocol())
    .configureLogging(import.meta.env.DEV ? LogLevel.Debug : LogLevel.Information)
    .build();
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.1
 */
ShopNet.Hub.on("OnNewUser", () => {
  OnNewUserSubject.next(true);
  console.debug("OnNewUser");
});
