namespace TSystems.LoveOTC.AdminHub;

using Helpers;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[PublicAPI]
[Authorize]
internal partial class AdminHub(ShopContext db, ILogger<AdminHub> logger) : CraftHub<AdminHub, IAdminClient>(db, logger) {
    private Task<bool?> isAdmin {
        get {
            var ok = Guid.TryParse(this.Context.UserIdentifier, out var uid);
            if (!ok) return Task.FromResult<bool?>(false);

            return this.Db.Users.Where(x => x.UserId == uid).Select(x => x.Admin).FirstOrDefaultAsync();
        }
    }

    public override async Task OnConnectedAsync() {
        var admin = await this.isAdmin;

        if (admin is true)
            this.Logger.AdminLogin(this.Name, this.Context.UserIdentifier, this.Context.ConnectionId);
        else {
            this.Logger.FailedAdminLogin(this.Name, this.Context.UserIdentifier, this.Context.ConnectionId);
            this.Context.Abort();
        }
    }
}
