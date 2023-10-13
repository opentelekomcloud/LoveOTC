// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
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
    public DbSet<Storage> Objects { get; }

    #region Product

    public DbSet<Product> Products { get; }

    public DbSet<Category> Categories { get; }

    public DbSet<Photo> Photos { get; }

    public DbSet<Variant> Variants { get; }

    public DbSet<Type> Types { get; }

    public DbSet<Combo> Combos { get; }

    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseHiLo();
    }
}
