namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<dynamic[]> OrderGetList() =>
        await this.Db.Orders
            .Select(x => new {
                x.OrderId,
                Products = x.Combos.Select(c => c.ProductId).ToArray(),
                Quantity = (ushort)x.OrderCombos.Sum(o => o.Quantity)
            })
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<dynamic> OrderGetDetail(uint orderId) {
        var items = await this.Db.OrderCombos
            .Where(x => x.OrderId == orderId)
            .Select(x => new {
                x.Quantity,
                Types = x.Combo.Types.Select(t => t.TypeId).ToArray()
            })
            .ToArrayAsync();

        var cmts = await this.Db.Comments
            .Where(x => x.OrderId == orderId)
            .Select(x => x.CommentId)
            .ToArrayAsync();

        return new {
            Items = items,
            Comments = cmts
        };
    }
}
