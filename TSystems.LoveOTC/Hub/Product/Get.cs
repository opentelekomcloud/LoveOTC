namespace TSystems.LoveOTC.Hub;

using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    protected const byte Limit = 1;

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
     * @version 1.1.0
     * </remarks>
     */
    public Task<uint[]> ProductGetComboList(uint prodId) =>
        this.Db.Combos
            .Where(x => x.ProductId == prodId)
            .Where(x => x.IsArchived != true)
            .Select(x => x.ComboId)
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.2.1
     * </remarks>
     */
    public Task<uint[]> ProductGetPhotoList(uint prodId) =>
        this.Db.Photos
            .Where(x => x.ProductId == prodId)
            .OrderBy(x => x.Order)
            .Select(x => x.PhotoId)
            .ToArrayAsync();
}
