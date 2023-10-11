import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { User as OIDCUser } from "oidc-client-ts";
import { OIDC } from "./Database";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export function accessTokenFactory(): string {
  if (OIDC) {
    const user = OIDCUser.fromStorageString(OIDC);
    return user.access_token;
  }

  return "";
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export class ShopNet {
  public static readonly Hub = new HubConnectionBuilder()
    .withUrl(import.meta.env.DEV ? "https://localhost/Hub" : "/Hub",
      {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        logMessageContent: import.meta.env.DEV,
        accessTokenFactory
      })
    .withAutomaticReconnect()
    .withHubProtocol(new MessagePackHubProtocol())
    .configureLogging(import.meta.env.DEV ? LogLevel.Debug : LogLevel.Information)
    .build();
}
