namespace TSystems.LoveOTC.AdminHub;

using System.Collections.Immutable;
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

        if (await this.Db.Products.AnyAsync(x => EF.Functions.ILike(x.Name, name)))
            throw new HubException($"Product {name} already exist");

        var temp = await this.Db.Products.AddAsync(new() {
            Name = name
        });

        await this.Db.SaveChangesAsync();
        return temp.Entity.ProductId;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
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

        await this.Db.SaveChangesAsync();
        return true;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
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

        await this.Db.SaveChangesAsync();
        return true;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
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
            EF.Functions.ILike(x.Name, name));

        if (has)
            throw new HubException($"Variant {name} already exist");

        var temp = await this.Db.Variants.AddAsync(new() {
            ProductId = prodId,
            Name = name,
        });

        await this.Db.SaveChangesAsync();
        return temp.Entity.ProductId;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<uint> ProductPostType(uint variantId, string name) {
        var prop = typeof(Type).GetProperty(nameof(Type.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var exist = await this.Db.Variants.AnyAsync(x => x.VariantId == variantId);
        if (!exist)
            throw new HubException($"Variant {variantId} not found");

        var has = await this.Db.Types.AnyAsync(x =>
            x.VariantId == variantId &&
            EF.Functions.ILike(x.Name, name));

        if (has)
            throw new HubException($"Type {name} already exist");

        var temp = await this.Db.Types.AddAsync(new() {
            VariantId = variantId,
            Name = name
        });

        await this.Db.SaveChangesAsync();
        return temp.Entity.VariantId;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<uint> ProductPostCombo(uint prodId, Dictionary<string, string> combo, ushort stock) {
        var variTypesDb = (await this.Db.Products
            .Include(x => x.Variants)
            .ThenInclude(x => x.Types)
            .Where(x => x.ProductId == prodId)
            .SelectMany(x => x.Variants)
            .ToDictionaryAsync(k => k.Name, v => v.Types.ToImmutableArray()))
            .ToImmutableSortedDictionary();

        var reqCombo = combo.ToImmutableSortedDictionary();

        if (reqCombo.Count != variTypesDb.Count)
            throw new HubException($"Mismatched: {variTypesDb.Count} Variants, got {reqCombo.Count} in Combos");

        var comboRawList = await this.Db.Combos
            .Include(x => x.Types)
            .ThenInclude(x => x.Variant)
            .Where(x => x.ProductId == prodId)
            .Select(x => x.Types)
            .ToArrayAsync();

        var existCombo = comboRawList
            .Select(x => x
                .ToImmutableSortedDictionary(k => k.Variant.Name, v => v.Name))
            .ToImmutableArray();

        var reqTypes = new List<Type>();

        foreach (var (vari, type) in reqCombo) {
            if (!variTypesDb.TryGetValue(vari, out var types))
                throw new HubException($"Variant {vari} not found");

            var t = types.Single(x => x.Name == type);
            reqTypes.Add(t);
        }

        if (existCombo.Any(x => x.SequenceEqual(reqCombo)))
            throw new HubException("Combo already exist");

        var temp = await this.Db.Combos.AddAsync(new() {
            ProductId = prodId,
            Stock = stock,
            Types = reqTypes
        });

        await this.Db.SaveChangesAsync();
        return temp.Entity.ComboId;
    }
}
