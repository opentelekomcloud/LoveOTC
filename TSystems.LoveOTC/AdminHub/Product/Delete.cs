namespace TSystems.LoveOTC.AdminHub;

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
    public async Task<bool> ProductDeletePhoto(uint photoId) {
        var res = await this.Db.Photos
            .Where(x => x.PhotoId == photoId)
            .ExecuteDeleteAsync();

        return res > 0;
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
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> ProductDeleteType(uint variantId, string reqType) {
        await this.deleteType(
            await this.Db.Types
                .Where(x => x.VariantId == variantId && x.Name == reqType)
                .Include(x => x.Combos)
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
}
