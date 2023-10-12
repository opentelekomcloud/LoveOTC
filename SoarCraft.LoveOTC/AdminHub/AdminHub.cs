namespace SoarCraft.LoveOTC.AdminHub;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

[Authorize]
internal partial class AdminHub : Hub<IAdminClient> {
}
