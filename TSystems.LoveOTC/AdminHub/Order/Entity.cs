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
    public async Task<dynamic?> OrderEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Orders
                .AnyAsync(x => x.OrderId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Orders
            .Where(x => x.OrderId == key)
            .Select(x => new {
                x.UserId,
                Status = Enum.GetName(x.Status)!,
                x.CreateAt,
                x.TrackingNumber,
                x.Version
            })
            .SingleOrDefaultAsync();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<dynamic?> CommentEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Comments
                .AnyAsync(x => x.CommentId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Comments
            .Where(x => x.CommentId == key)
            .Select(x => new {
                x.Content,
                x.UserId,
                x.CreateAt,
                x.Version
            })
            .SingleOrDefaultAsync();
    }
}
