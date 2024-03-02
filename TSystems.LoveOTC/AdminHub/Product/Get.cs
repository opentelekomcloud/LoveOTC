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
     * @version 1.1.0
     * </remarks>
     */
    public Task<uint[]> ProductGetVariants(uint prodId) =>
        this.Db.Variants
            .Where(x => x.ProductId == prodId)
            .Select(x => x.VariantId)
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.3.0
     * @version 0.1.0
     * </remarks>
     */
    public Task<uint[]> ProductGetTypes(uint variantId) =>
        this.Db.Types
            .Where(x => x.VariantId == variantId)
            .Select(x => x.TypeId)
            .ToArrayAsync();
}
