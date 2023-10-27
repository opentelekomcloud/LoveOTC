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
    public async Task<dynamic?> OrderEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Orders
                .AnyAsync(x => x.OrderId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Orders
            .Where(x => x.OrderId == key && x.UserId == this.UserId)
            .Select(x => new {
                Status = Enum.GetName(x.Status)!,
                x.CreateAt,
                x.TrackingNumber,
                x.Version
            })
            .SingleOrDefaultAsync();
    }
}
