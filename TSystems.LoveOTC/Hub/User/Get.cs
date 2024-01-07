namespace TSystems.LoveOTC.Hub;

using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.1
     * </remarks>
     */
    [Authorize]
    public async Task<dynamic?> UserGetMe(byte _, uint? version) {
        var hasNew = this.Context.Items.TryGetValue("NewUser", out var isNew);
        if (hasNew && isNew is true) return null;

        if (version is not null) {
            var noChange = await this.Db.Users
                .AnyAsync(x => x.UserId == this.UserId && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Users
            .Where(x => x.UserId == this.UserId)
            .Select(x => new {
                x.Name,
                x.EMail,
                x.Phone,
                x.Address,
                x.Admin,
                x.Version
            })
            .SingleOrDefaultAsync();
    }
}
