namespace TSystems.LoveOTC.Hub;

using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public Task<string[]> GalleryGetCategories() =>
        this.Db.Categories.Select(x => x.Name).ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public Task<uint[]> GalleryGetProducts(string category) =>
        this.Db.Products
            .Where(x => x.Category!.Name == category)
            .Select(x => x.ProductId)
            .ToArrayAsync();
}
