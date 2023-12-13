namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public Task<Guid[]> UserGetList() =>
        this.Db.Users
            .Select(x => x.UserId)
            .ToArrayAsync();
}
