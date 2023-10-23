namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.1
     * </remarks>
     */
    public async Task<ProductItem[]> ProductGetList() {
        var raw = await this.Db.Products
            .Select(x => new {
                x.ProductId,
                Cover = x.Photos
                    .Where(p => p.Cover == true)
                    .Select(p => p.ObjectId)
                    .SingleOrDefault(),
                x.Name,
                x.Category,
                Variant = (byte)x.Variants.Count,
                Combo = (byte)x.Combos.Count,
                Stock = x.Combos.Select(s => s.Stock).ToArray()
            })
            .ToArrayAsync();

        return raw.Select(x => new ProductItem {
            ProductId = x.ProductId,
            Cover = x.Cover,
            Name = x.Name,
            Category = x.Category?.Name ?? "Pending",
            Variant = x.Variant,
            Combo = x.Combo,
            Stock = x.Stock.Aggregate((uint)0, (prev, curr) => prev + curr)
        }).ToArray();
    }

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
