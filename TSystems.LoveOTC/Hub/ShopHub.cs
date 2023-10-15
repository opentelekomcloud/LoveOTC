namespace TSystems.LoveOTC.Hub;

using Helpers;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[PublicAPI]
internal partial class ShopHub(ShopContext db, ILogger<ShopHub> logger) : CraftHub<ShopHub, INetClient>(db, logger) {
    public override async Task OnConnectedAsync() {
        var ok = Guid.TryParse(this.Context.UserIdentifier, out var uid);

        if (ok) {
            var exist = await this.Db.Users.AnyAsync(x => x.UserId == uid);

            if (exist)
                this.Logger.UserLogin(this.Name, this.Context.UserIdentifier, this.Context.ConnectionId);
            else
                await this.Clients.Caller.OnNewUser();
        }
    }
}
