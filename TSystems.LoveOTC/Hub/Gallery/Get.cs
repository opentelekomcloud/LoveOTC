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
    public async Task<string[]> GalleryGetCategories() =>
        await this.Db.Categories.Select(x => x.Name).ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<uint[]> GalleryGetProducts(string category) =>
        await this.Db.Products
            .Where(x => x.Category!.Name == category)
            .Select(x => x.ProductId)
            .ToArrayAsync();
}
