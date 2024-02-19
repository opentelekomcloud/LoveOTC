namespace TSystems.LoveOTC.Hub;

using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<bool> OrderDeleteCancelled(uint orderId) {
        var row = await this.Db.Orders
            .Where(x => x.UserId == this.UserId)
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status == OrderStatus.Cancelled)
            .ExecuteDeleteAsync();

        return row > 0;
    }
}
