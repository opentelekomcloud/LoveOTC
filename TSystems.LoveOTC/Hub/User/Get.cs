namespace TSystems.LoveOTC.Hub;

using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<dynamic?> UserGetMe() {
        var hasNew = this.Context.Items.TryGetValue("NewUser", out var isNew);
        if (hasNew && isNew is true) return null;

        return await this.Db.Users
            .Where(x => x.UserId == this.UserId)
            .Select(user => new {
                user.Name,
                user.EMail,
                user.Phone,
                user.Address
            })
            .SingleOrDefaultAsync();
    }
}
