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
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductPatchCaption(uint photoId, string caption) {
        var prop = typeof(Photo).GetProperty(nameof(Photo.Caption))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(caption))
            throw new HubException(valid.FormatErrorMessage("Caption"));

        var row = await this.Db.Photos
            .Where(x => x.PhotoId == photoId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Caption, caption));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<bool> ProductPatchVariantName(uint variantId, string name) {
        var prop = typeof(Variant).GetProperty(nameof(Variant.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var any = await this.Db.Variants
            .Where(x => x.VariantId == variantId)
            .SelectMany(x => x.Types)
            .SelectMany(x => x.Combos)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (any) {
            var oldVari = await this.Db.Variants
                .Include(x => x.Types)
                .ThenInclude(x => x.Combos)
                .SingleAsync(x => x.VariantId == variantId);

            oldVari.IsRemoved = true;

            var newVari = (await this.Db.Variants.AddAsync(new() {
                Name = oldVari.Name,
                ProductId = oldVari.ProductId,
                Types = new List<Type>()
            })).Entity;

            foreach (var oldType in oldVari.Types) {
                oldType.IsRemoved = true;

                var newType = new Type {
                    Name = oldType.Name,
                    VariantId = oldType.VariantId,
                    Combos = new List<Combo>()
                };
                newVari.Types.Add(newType);

                foreach (var oldCombo in oldType.Combos) {
                    oldCombo.IsRemoved = true;

                    newType.Combos.Add(new() {
                        ProductId = oldCombo.ProductId,
                        Stock = oldCombo.Stock,
                    });
                }
            }

            await this.Db.SaveChangesAsync();
            return true;
        }

        var row = await this.Db.Variants
            .Where(x => x.VariantId == variantId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Name, name));

        return row > 0;
    }

    /**
     * <remarks>
     * TODO
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductPatchType(uint variantId, string oldName, string newName) {
        var prop = typeof(Type).GetProperty(nameof(Type.Name))!;
        var valid = prop.GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(newName))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var row = await this.Db.Types
            .Where(x => x.VariantId == variantId && x.Name == oldName)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Name, newName));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductPatchCombo(uint comboId, Dictionary<string, string> combo, byte stock) {
        var variTypes = (await this.Db.Variants
            .Where(x => x.ProductId == this.Db.Combos
                .Where(c => c.ComboId == comboId)
                .Select(c => c.ProductId)
                .Single())
            .Include(x => x.Types)
            .Select(x => new {
                x.Name,
                Types = x.Types.Select(t => t.Name).ToImmutableArray()
            })
            .ToDictionaryAsync(k => k.Name, v => v.Types))
            .ToImmutableSortedDictionary();

        var reqCombo = combo.ToImmutableSortedDictionary();

        if (reqCombo.Count != variTypes.Count)
            throw new HubException($"Mismatched: {variTypes.Count} Variants, got {reqCombo.Count} in Combos");

        foreach (var (vari, type) in reqCombo) {
            if (!variTypes.TryGetValue(vari, out var types))
                throw new HubException($"Variant {vari} not found");

            if (!types.Any(x => x == type))
                throw new HubException($"Type {type} not found in variant {vari}");
        }

        throw new NotImplementedException();
    }
}
