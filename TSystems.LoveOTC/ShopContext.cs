namespace TSystems.LoveOTC;

using Microsoft.EntityFrameworkCore;
using Models;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class ShopContext(DbContextOptions<ShopContext> opts) : DbContext(opts) {
    public DbSet<Storage> Objects { get; set; }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseHiLo();
    }
}
