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
    public DbSet<Storage> Objects { get; init; }

    public DbSet<User> Users { get; init; }

    #region Product

    public DbSet<Product> Products { get; init; }

    public DbSet<Category> Categories { get; init; }

    public DbSet<Photo> Photos { get; init; }

    public DbSet<Variant> Variants { get; init; }

    public DbSet<Type> Types { get; init; }

    public DbSet<Combo> Combos { get; init; }

    #endregion

    #region Order

    public DbSet<Order> Orders { get; init; }

    public DbSet<OrderCombo> OrdersCombo { get; init; }

    public DbSet<Comment> Comments { get; init; }

    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseHiLo();

        modelBuilder.Entity<Order>()
            .HasMany(e => e.Combos)
            .WithMany(e => e.Orders)
            .UsingEntity<OrderCombo>();
    }
}
