namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 2.0.0
     * </remarks>
     */
    public Task<uint[]> ProductGetList() =>
        this.Db.Products
            .Select(x => x.ProductId)
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.2.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<dynamic?> ProductGetCount(uint prodId) =>
        await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .Select(x => new {
                Variant = x.Variants.Count,
                Combo = x.Combos.Count,
                Stock = x.Combos.Sum(s => s.Stock)
            })
            .SingleOrDefaultAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<dynamic[]> ProductGetVariants(uint prodId) =>
        await this.Db.Variants
            .Where(x => x.ProductId == prodId)
            .Select(x => new {
                x.VariantId,
                Types = x.Types.Select(t => t.TypeId).ToArray()
            })
            .ToArrayAsync();
}
