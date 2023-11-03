namespace TSystems.LoveOTC.AdminHub;

using Helpers;
using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> UserPostAdmin(Guid userId) {
        var row = await this.Db.Users
            .Where(x => x.UserId == userId)
            .ExecuteUpdateAsync(x =>
                x.SetProperty(u => u.Admin, true));

        this.Logger.GrantAdmin(this.Name, userId, this.Context);
        return row == 1;
    }
}
