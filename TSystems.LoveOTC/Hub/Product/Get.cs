namespace TSystems.LoveOTC.Hub;

using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    protected const byte Limit = 3;

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public Task<byte> ProdGetLimit(uint _) => Task.FromResult(Limit);

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<dynamic[]> ProductGetComboList(uint prodId) =>
        await this.Db.Combos
            .Where(x => x.ProductId == prodId)
            .Select(x => new {
                x.ComboId,
                x.Stock,
                Types = x.Types.Select(t => t.TypeId).ToArray()
            })
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.2.0
     * </remarks>
     */
    public Task<uint[]> ProductGetPhotoList(uint prodId) =>
        this.Db.Photos
            .Where(x => x.ProductId == prodId)
            .Select(x => x.PhotoId)
            .ToArrayAsync();
}
