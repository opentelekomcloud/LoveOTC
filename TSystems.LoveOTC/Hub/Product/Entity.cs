﻿namespace TSystems.LoveOTC.Hub;

using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
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
                x.CategoryId,
                x.Description,
                x.Version
            })
            .SingleOrDefaultAsync();
    }
}
