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
}
