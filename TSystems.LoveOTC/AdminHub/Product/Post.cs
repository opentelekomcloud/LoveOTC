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
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<uint> ProductPostCreate(string name) {
        var prop = typeof(Product).GetProperty(nameof(Product.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var temp = await this.Db.Products.AddAsync(new() {
            Name = name
        });

        return temp.Entity.ProductId;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPostMovePhoto(uint photoId, bool up) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPostPhoto(uint prodId, IAsyncEnumerable<byte[]> input) {
        var exist = await this.Db.Products.AnyAsync(x => x.ProductId == prodId);
        if (!exist)
            throw new HubException($"Product {prodId} not found");

        const int maxSize = 10 * 1024 * 1024;

        var current = 0;
        using var buffer = new MemoryStream();

        await foreach (var chunk in input) {
            current += chunk.Length;
            if (current > maxSize)
                throw new HubException("File too large, max 10MB");

            await buffer.WriteAsync(chunk);
        }

        buffer.Seek(0, SeekOrigin.Begin);
        using var img = await Image.LoadAsync(buffer);

        if (img.Width < 1600 || img.Height < 1600 || img.Width != img.Height)
            throw new HubException("Image should be larger than 1600px and 1:1 ratio");

        using var output = new MemoryStream();
        await img.SaveAsWebpAsync(output);

        var obj = await this.Db.Objects.AddAsync(new() {
            Data = output.ToArray()
        });

        await this.Db.Photos.AddAsync(new() {
            ProductId = prodId,
            ObjectId = obj.Entity.Id
        });

        var row = await this.Db.SaveChangesAsync();
        return row < 1 ? throw new HubException("Failed to save data") : true;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<uint> ProductPostVariant(string prodId, string name) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPostType(uint variantId, string name) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<uint> ProductPostCombo(string prodId, Dictionary<string, string> combo, ushort stock) {
        throw new NotImplementedException();
    }
}
