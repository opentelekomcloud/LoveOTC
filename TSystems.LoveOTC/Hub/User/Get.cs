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
    public async Task<Persona> UserGetMe() {
        var hasNew = this.Context.Items.TryGetValue("NewUser", out var isNew);
        if (hasNew && isNew is true) return null!;

        var res = await this.Db.Users
            .Where(x => x.UserId == this.UserId)
            .Select(user => new Persona {
                Name = user.Name,
                EMail = user.EMail,
                Phone = user.Phone,
                Address = user.Address
            }).FirstAsync();

        return res;
    }
}
