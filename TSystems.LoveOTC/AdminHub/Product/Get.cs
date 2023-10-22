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
    public async Task<List<ProductItem>> ProductGetList() {
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
            .ToListAsync();

        return raw.Select(x => new ProductItem {
            ProductId = x.ProductId,
            Cover = x.Cover,
            Name = x.Name,
            Category = x.Category?.Name ?? "Pending",
            Variant = x.Variant,
            Combo = x.Combo,
            Stock = x.Stock.Aggregate((uint)0, (prev, curr) => prev + curr)
        }).ToList();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<string> ProductGetName(uint prodId) {
        return "OTC SHIRT - GREY";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<string> ProductGetCategory(uint prodId) {
        return "Clothes";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<VariantItem>> ProductGetVariants(uint prodId) {
        return new() {
            new() {
                VariantId = 1,
                Name = "Color",
                Types = new() { "White", "Red" }
            },
            new() {
                VariantId = 2,
                Name = "Size",
                Types = new() { "Big", "Small" }
            }
        };
    }
}
