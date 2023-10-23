namespace TSystems.LoveOTC.Hub;

using System.Collections.Immutable;
using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<ProductInfo> ProdGetBasic(uint prodId) {
        return await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .Select(x => new ProductInfo {
                Name = x.Name,
                Cover = x.Photos
                    .Where(p => p.Cover == true)
                    .Select(p => p.Object.Id)
                    .Single()
            })
            .SingleAsync();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public Task<byte> ProdGetLimit(uint _) {
        return Task.FromResult<byte>(3);
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<ComboItem[]> ProdGetCombo(uint prodId) {
        var comboDb = await this.Db.Combos
            .Where(x => x.ProductId == prodId)
            .Include(x => x.Types)
            .ThenInclude(x => x.Variant)
            .ToArrayAsync();

        return comboDb.Select(x => new ComboItem {
            ComboId = x.ComboId,
            Stock = x.Stock,
            Combo = x.Types
                .ToImmutableDictionary(k => k.Variant.Name, v => v.Name)
        }).ToArray();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<PhotoItem>> ProdGetCarousel(uint prodId) {
        return new() {
            new() {
                PhotoId = 0,
                Cover = Guid.NewGuid(),
                Caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
            new() {
                PhotoId = 1,
                Cover = Guid.NewGuid(),
                Caption = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        };
    }
}
