namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<dynamic[]> ProductGetList() =>
        await this.Db.Products
            .Select(x => new {
                x.ProductId,
                Variant = x.Variants.Count,
                Combo = x.Combos.Count,
                Stock = x.Combos.Sum(s => s.Stock)
            })
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<string> ProductGetName(uint prodId) =>
        await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .Select(x => x.Name)
            .SingleAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<string> ProductGetCategory(uint prodId) {
        var cate = await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .Select(x => x.Category)
            .SingleAsync();

        return cate?.Name ?? "Pending";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<VariantItem[]> ProductGetVariants(uint prodId) =>
        await this.Db.Variants
            .Where(x => x.ProductId == prodId)
            .Select(x => new VariantItem {
                VariantId = x.VariantId,
                Name = x.Name,
                Types = x.Types.Select(t => t.Name).ToArray()
            })
            .ToArrayAsync();
}
