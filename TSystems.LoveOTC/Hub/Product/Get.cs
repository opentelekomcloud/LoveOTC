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
    public Task<byte> ProdGetLimit(uint _) => Task.FromResult<byte>(3);

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<ComboItem[]> ProductGetComboList(uint prodId) {
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
     * @since 0.5.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<uint[]> ProductGetPhotoList(uint prodId) =>
        await this.Db.Photos
            .Where(x => x.ProductId == prodId)
            .Select(x => x.PhotoId)
            .ToArrayAsync();
}
