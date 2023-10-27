namespace TSystems.LoveOTC.Hub;

using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    [Authorize]
    public async Task<dynamic[]> OrderGetList() =>
        await this.Db.Orders
            .Where(x => x.UserId == this.UserId)
            .Select(x => new {
                x.OrderId,
                Products = x.Combos.Select(c => c.ProductId).ToArray(),
                Quantity = (ushort)x.OrderCombos.Sum(o => o.Quantity)
            })
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    [Authorize]
    public async Task<dynamic[]> OrderGetDetail(uint orderId) =>
        await this.Db.OrderCombos
            .Where(x => x.OrderId == orderId && x.Order.UserId == this.UserId)
            .Select(x => new {
                x.Quantity,
                Types = x.Combo.Types.Select(t => t.TypeId).ToArray(),
                Cmts = x.Order.Comments.Select(c => c.CommentId).ToArray()
            })
            .ToArrayAsync();
}
