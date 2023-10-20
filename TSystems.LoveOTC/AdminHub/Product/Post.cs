namespace TSystems.LoveOTC.AdminHub;

using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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

        if (this.Context.Items.TryGetValue("PendingProduct", out var list))
            ((List<EntityEntry<Product>>)list!).Add(temp);
        else
            this.Context.Items.Add("PendingProduct", new List<EntityEntry<Product>> { temp });

        return temp.Entity.ProductId;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> ProductPostMovePhoto(uint photoId, bool up) {
        var orders = await this.Db.Photos
            .Where(x => x.ProductId == this.Db.Photos
                .Where(y => y.PhotoId == photoId)
                .Select(z => z.ProductId)
                .Single())
            .OrderBy(x => x.Order)
            .ToListAsync();

        var index = orders.FindIndex(x => x.PhotoId == photoId);
        var current = orders[index].Order;

        if (up) {
            if (current == 1)
                throw new HubException("Photo already at top");

            orders[index - 1].Order = current;
            orders[index].Order = (byte)(current - 1);
        } else {
            if (current == orders.Last().Order)
                throw new HubException("Photo already at bottom");

            orders[index + 1].Order = current;
            orders[index].Order = (byte)(current + 1);
        }

        for (byte i = 0; i < orders.Count; i++)
            orders[i].Order = (byte)(i + 1);

        var row = await this.Db.SaveChangesAsync();
        return row < 1 ? throw new HubException("Failed to Move Photo") : true;
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
            throw new HubException(
                $"Image should be larger than 1600px and 1:1 ratio, currently {img.Width} : {img.Height}");

        using var output = new MemoryStream();
        await img.SaveAsWebpAsync(output);

        var obj = await this.Db.Objects.AddAsync(new() {
            Data = output.ToArray()
        });

        var next = (byte)(await this.Db.Photos.CountAsync(x => x.ProductId == prodId) + 1);

        await this.Db.Photos.AddAsync(new() {
            ProductId = prodId,
            Object = obj.Entity,
            Order = next
        });

        var row = await this.Db.SaveChangesAsync();
        return row < 1 ? throw new HubException("Failed to save data") : true;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<uint> ProductPostVariant(uint prodId, string name) {
        var prop = typeof(Variant).GetProperty(nameof(Variant.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var exist = await this.Db.Products.AnyAsync(x => x.ProductId == prodId);
        if (!exist)
            throw new HubException($"Product {prodId} not found");

        var has = await this.Db.Variants.AnyAsync(x =>
            x.ProductId == prodId &&
            x.Name.Equals(name, StringComparison.OrdinalIgnoreCase));

        if (has)
            throw new HubException($"Variant {name} already exist");

        var temp = await this.Db.Variants.AddAsync(new() {
            ProductId = prodId,
            Name = name,
        });

        if (this.Context.Items.TryGetValue("PendingVariant", out var list))
            ((List<EntityEntry<Variant>>)list!).Add(temp);
        else
            this.Context.Items.Add("PendingVariant", new List<EntityEntry<Variant>> { temp });

        return temp.Entity.VariantId;
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
    public async Task<uint> ProductPostCombo(uint prodId, Dictionary<string, string> combo, ushort stock) {
        throw new NotImplementedException();
    }
}
