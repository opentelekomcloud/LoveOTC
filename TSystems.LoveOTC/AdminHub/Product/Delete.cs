namespace TSystems.LoveOTC.AdminHub;

using Microsoft.EntityFrameworkCore;
using Models;
using Z.EntityFramework.Plus;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.3.0
     * </remarks>
     */
    public async Task<bool> ProductDeletePhoto(uint photoId) {
        var where = this.Db.Photos
            .Where(x => x.PhotoId == photoId);

        var objId = await where
            .Select(x => x.ObjectId)
            .SingleAsync();

        await this.Db.Objects
            .Where(x => x.Id == objId)
            .ExecuteDeleteAsync();

        await where
            .ExecuteDeleteAsync();

        return true;
    }

    /**
     * <summary>
     * Include Types -> Combos
     * </summary>
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    private async Task deleteVariant(Variant variant) {
        var any = await this.Db.Variants
            .Where(x => x.VariantId == variant.VariantId)
            .SelectMany(x => x.Types)
            .SelectMany(x => x.Combos)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (any) {
            variant.IsArchived = true;

            foreach (var type in variant.Types)
                await this.deleteType(type);
        } else
            this.Db.Variants.Remove(variant);
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductDeleteVariant(uint variantId) {
        await this.deleteVariant(
            await this.Db.Variants
                .Where(x => x.VariantId == variantId)
                .Include(x => x.Types)
                .ThenInclude(x => x.Combos)
                .SingleAsync()
        );

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <summary>
     * Include Combos
     * </summary>
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    private async Task deleteType(Type type) {
        var any = await this.Db.Types
            .Where(x => x.TypeId == type.TypeId)
            .SelectMany(x => x.Combos)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (any) {
            type.IsArchived = true;

            foreach (var combo in type.Combos)
                await this.deleteCombo(combo);
        } else
            this.Db.Types.Remove(type);
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.3.0
     * </remarks>
     */
    public async Task<bool> ProductDeleteType(uint typeId) {
        await this.deleteType(
            await this.Db.Types
                .Where(x => x.TypeId == typeId)
                .IncludeOptimized(x => x.Combos)
                .SingleAsync()
        );

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    private async Task deleteCombo(Combo combo) {
        var any = await this.Db.Combos
            .Where(x => x.ComboId == combo.ComboId)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (any)
            combo.IsArchived = true;
        else
            this.Db.Combos.Remove(combo);
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductDeleteCombo(uint comboId) {
        await this.deleteCombo(
            await this.Db.Combos
                .Where(x => x.ComboId == comboId)
                .SingleAsync()
        );

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductDeleteProduct(uint prodId) {
        var prod = this.Db.Products
            .Where(x => x.ProductId == prodId);

        var any = await prod
            .SelectMany(x => x.Combos)
            .SelectMany(x => x.Orders)
            .AnyAsync();

        if (!any)
            return await prod.ExecuteDeleteAsync() > 0;

        var product = await prod
            .Include(x => x.Variants)
            .ThenInclude(x => x.Types)
            .ThenInclude(x => x.Combos)
            .SingleAsync();

        product.IsArchived = true;

        foreach (var variant in product.Variants)
            await this.deleteVariant(variant);

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 1.2.0
     * @version 0.1.1
     * </remarks>
     */
    public async Task<bool> ProductDetachCategory(uint prodId) {
        var prod = await this.Db.Products
            .SingleAsync(x => x.ProductId == prodId);

        var cate = prod.CategoryId;

        if (cate is null)
            return false;

        prod.CategoryId = null;

        var res = await this.Db.SaveChangesAsync();

        await this.Db.Categories
            .Where(x =>
                x.CategoryId == cate &&
                x.Products.Count == 0)
            .ExecuteDeleteAsync();

        return res > 0;
    }
}
