namespace TSystems.LoveOTC.Hub;

using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<dynamic?> ProductEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Products
                .AnyAsync(x => x.ProductId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Products
            .Where(x => x.ProductId == key)
            .Select(x => new {
                x.Name,
                Category = x.Category!.Name,
                x.Version
            })
            .SingleOrDefaultAsync();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 1.2.0
     * @version 1.0.0
     * </remarks>
     */
    public async Task<dynamic?> LexicalEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Products
            .AnyAsync(x => x.ProductId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Products
            .Where(x => x.ProductId == key)
            .Select(x => new {
                x.Description,
                x.Version
            })
            .SingleOrDefaultAsync();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<dynamic?> PhotoEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Photos
                .AnyAsync(x => x.PhotoId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Photos
            .Where(x => x.PhotoId == key)
            .Select(x => new {
                x.Cover,
                x.Caption,
                x.Order,
                x.ObjectId,
                x.Version
            })
            .SingleOrDefaultAsync();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<dynamic?> TypeEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Types
                .AnyAsync(x => x.TypeId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Types
            .Where(x => x.TypeId == key)
            .Select(x => new {
                x.Name,
                x.VariantId,
                x.Version
            })
            .SingleOrDefaultAsync();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<dynamic?> VariantEntity(uint key, uint? version) {
        if (version is not null) {
            var noChange = await this.Db.Variants
                .AnyAsync(x => x.VariantId == key && x.Version == version);

            if (noChange) return true;
        }

        return await this.Db.Variants
            .Where(x => x.VariantId == key)
            .Select(x => new {
                x.Name,
                x.ProductId,
                x.Version
            })
            .SingleOrDefaultAsync();
    }
}
