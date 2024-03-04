namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<dynamic?> UserEntity(Guid key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Users
                .AnyAsync(x => x.UserId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Users
            .Where(x => x.UserId == key)
            .Select(x => new {
                x.Surname,
                x.Forename,
                x.EMail,
                x.Phone,
                x.Address,
                x.Admin
            })
            .SingleOrDefaultAsync();
    }
}
