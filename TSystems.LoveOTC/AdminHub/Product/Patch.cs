namespace TSystems.LoveOTC.AdminHub;

using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductPatchName(uint prodId, string name) {
        var prop = typeof(Product).GetProperty(nameof(Product.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var row = await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Name, name));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.1
     * </remarks>
     */
    public async Task<bool> ProductPatchCategory(uint prodId, string name) {
        var prop = typeof(Category).GetProperty(nameof(Category.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var cate = await this.Db.Categories
            .Where(x => x.Name == name)
            .Select(x => x.CategoryId)
            .SingleAsync();

        var row = await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.CategoryId, cate));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductPatchPhoto(uint photoId, IAsyncEnumerable<byte[]> input) {
        var objId = await this.Db.Photos
            .Where(x => x.PhotoId == photoId)
            .Select(x => x.ObjectId)
            .SingleAsync();

        await using var buffer = await this.HandleByteStream(input, 10 * 1024 * 1024, "10 MB");
        var img = await EncodeWebp(buffer);

        var row = await this.Db.Objects
            .Where(x => x.Id == objId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Data, img));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPatchCaption(uint photoId, string caption) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPatchVariantName(uint variantId, string name) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPatchType(uint variantId, string oldName, string newName) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPatchCombo(uint comboId, Dictionary<string, string> combo, byte stock) {
        throw new NotImplementedException();
    }
}
