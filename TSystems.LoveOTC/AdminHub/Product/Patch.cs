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
        var valid = typeof(Product)
            .GetProperty(nameof(Product.Name))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var row = await this.Db.Products
            .Where(x => x.ProductId == prodId)
            .ExecuteUpdateAsync(x =>
                x.SetProperty(p => p.Name, name));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<bool> ProductPatchCategory(uint prodId, string name) {
        var valid = typeof(Category)
            .GetProperty(nameof(Category.Name))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var newCate = await this.Db.Categories
                          .Where(x => x.Name == name)
                          .SingleOrDefaultAsync()
                      ?? (await this.Db.Categories.AddAsync(new() {
                          Name = name
                      })).Entity;

        var prod = await this.Db.Products
            .Include(x => x.Category)
            .SingleAsync(x => x.ProductId == prodId);

        var inUse = await this.Db.Products
            .Where(x => x.CategoryId == prod.CategoryId && x.ProductId != prod.ProductId)
            .AnyAsync();

        if (!inUse)
            this.Db.Categories.Remove(prod.Category!);

        prod.Category = newCate;

        return await this.Db.SaveChangesAsync() > 0;
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
        var valid = typeof(Photo)
            .GetProperty(nameof(Photo.Caption))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(caption))
            throw new HubException(valid.FormatErrorMessage("Caption"));

        var row = await this.Db.Photos
            .Where(x => x.PhotoId == photoId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Caption, caption));

        return row > 0;
    }

    /**
     * <summary>
     * Include Combos
     * </summary>
     *
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.2.0
     * </remarks>
     */
    private async Task<List<Type>> archiveTypes(ICollection<Type> oldTypes) {
        var newTypes = new List<Type>(oldTypes.Count);

        foreach (var type in oldTypes) {
            newTypes.Add(new() {
                Name = type.Name,
                VariantId = type.VariantId,
                Combos = await this.archiveCombos(type.Combos)
            });

            await this.deleteType(type);
        }

        return newTypes;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<bool> ProductPatchVariantName(uint variantId, string name) {
        var valid = typeof(Variant)
            .GetProperty(nameof(Variant.Name))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(name))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var variant = this.Db.Variants
            .Where(x => x.VariantId == variantId);

        var any = await variant
            .SelectMany(x => x.Types)
            .SelectMany(x => x.Combos)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (any) {
            var oldVari = await variant
                .Include(x => x.Types)
                .ThenInclude(x => x.Combos)
                .SingleAsync();

            oldVari.IsArchived = true;

            await this.Db.Variants.AddAsync(new() {
                Name = name,
                ProductId = oldVari.ProductId,
                Types = await this.archiveTypes(oldVari.Types)
            });

            return await this.Db.SaveChangesAsync() > 0;
        }

        var row = await variant
            .ExecuteUpdateAsync(x =>
                x.SetProperty(p => p.Name, name));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.2.0
     * </remarks>
     */
    private async Task<List<Combo>> archiveCombos(ICollection<Combo> oldCombos) {
        var newCombos = new List<Combo>(oldCombos.Count);

        foreach (var combo in oldCombos) {
            newCombos.Add(new() {
                ProductId = combo.ProductId,
                Stock = combo.Stock
            });

            await this.deleteCombo(combo);
        }

        return newCombos;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<bool> ProductPatchType(uint variantId, string oldName, string newName) {
        var valid = typeof(Type)
            .GetProperty(nameof(Type.Name))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(newName))
            throw new HubException(valid.FormatErrorMessage("Name"));

        var type = this.Db.Types
            .Where(x => x.VariantId == variantId && x.Name == oldName);

        var any = await type
            .SelectMany(x => x.Combos)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (any) {
            var oldType = await type
                .Include(x => x.Combos)
                .SingleAsync();

            oldType.IsArchived = true;

            await this.Db.Types.AddAsync(new() {
                Name = newName,
                VariantId = oldType.VariantId,
                Combos = await this.archiveCombos(oldType.Combos)
            });

            return await this.Db.SaveChangesAsync() > 0;
        }

        var row = await type
            .ExecuteUpdateAsync(x =>
                x.SetProperty(p => p.Name, newName));

        return row > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<bool> ProductPatchCombo(uint comboId, Dictionary<string, string> combo, ushort stock) {
        var queryCombo = this.Db.Combos
            .Where(x => x.ComboId == comboId);

        var dbCombo = await queryCombo
            .Include(x => x.Types)
            .ThenInclude(x => x.Variant)
            .SingleAsync();

        var reqCombo = combo.ToImmutableSortedDictionary();

        {
            var comboVariType = dbCombo.Types
                .ToImmutableSortedDictionary(k => k.Variant.Name, v => v.Name);

            if (comboVariType.Count != reqCombo.Count)
                throw new HubException($"Mismatched: {comboVariType.Count} Variants, got {reqCombo.Count} in Combos");

            if (comboVariType.SequenceEqual(reqCombo)) {
                dbCombo.Stock = stock;
                return await this.Db.SaveChangesAsync() > 0;
            }
        }

        var allVariTypes = (await this.Db.Variants
                .Where(x => x.ProductId == queryCombo
                    .Select(c => c.ProductId)
                    .Single())
                .Include(x => x.Types)
                .Select(x => new {
                    x.Name,
                    x.Types
                })
                .ToDictionaryAsync(k => k.Name, v => v.Types))
            .ToImmutableSortedDictionary();

        var reqTypes = new List<Type>(reqCombo.Count);

        foreach (var (vari, type) in reqCombo)
            reqTypes.Add(
                allVariTypes[vari]
                    .Single(x => x.Name == type)
            );

        var inUse = await queryCombo
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (inUse) {
            dbCombo.IsArchived = true;

            await this.Db.Combos.AddAsync(new() {
                ProductId = dbCombo.ProductId,
                Stock = stock,
                Types = reqTypes
            });
        } else
            dbCombo.Types = reqTypes;

        return await this.Db.SaveChangesAsync() > 0;
    }
}
