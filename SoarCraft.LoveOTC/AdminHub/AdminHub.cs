namespace SoarCraft.LoveOTC.AdminHub;

using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

[PublicAPI]
[Authorize]
internal partial class AdminHub : Hub<IAdminClient> {
}
