namespace TSystems.LoveOTC.AdminHub;

using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[PublicAPI]
[Authorize]
internal partial class AdminHub : Hub<IAdminClient> {
}
