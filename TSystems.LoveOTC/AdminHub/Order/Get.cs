namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 1.3.0
     * @version 0.1.0
     * </remarks>
     */
    public Task<long> OrderGetCount() => this.Db.Orders.LongCountAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.3.0
     * </remarks>
     */
    public async Task<dynamic[]> OrderGetList(uint page) =>
        await this.Db.Orders
            .Select(x => new {
                x.OrderId,
                Products = x.Combos.Select(c => c.ProductId).ToArray(),
                Quantity = (ushort)x.OrderCombos.Sum(o => o.Quantity)
            })
            .OrderByDescending(x => x.OrderId)
            .Skip((int)(page - 1) * 30)
            .Take(30)
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 1.1.0
     * </remarks>
     */
    public async Task<dynamic> OrderGetItems(uint orderId) =>
        await this.Db.OrderCombos
            .Where(x => x.OrderId == orderId)
            .Select(x => new {
                x.Quantity,
                Types = x.Combo.Types.Select(t => t.TypeId).ToArray()
            })
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 1.1.0
     * </remarks>
     */
    public Task<uint[]> OrderGetCmts(uint orderId) =>
        this.Db.Comments
            .Where(x => x.OrderId == orderId)
            .Select(x => x.CommentId)
            .ToArrayAsync();
}
