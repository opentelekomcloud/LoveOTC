namespace TSystems.LoveOTC.Hub;

using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[PublicAPI]
internal partial class ShopHub : Hub<INetClient> {
}
