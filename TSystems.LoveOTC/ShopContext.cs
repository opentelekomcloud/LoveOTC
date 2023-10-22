// ReSharper disable UnassignedGetOnlyAutoProperty

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC;

using Entities;
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

        #region MockData

        modelBuilder.Entity<User>().HasData(new User {
            UserId = Guid.Parse("e2653b80-9be7-41d0-aff0-524ad0e66944"),
            Name = "Aloento",
            EMail = "me@Aloen.to",
            Phone = "+36 300000000",
            Address = "T-Systems, Budapest, Hungary",
            Admin = true
        });

        #region Product

        modelBuilder.Entity<Category>().HasData(new Category {
            CategoryId = 1,
            Name = "T-Jacket"
        }, new Category {
            CategoryId = 2,
            Name = "T-Polo"
        });

        modelBuilder.Entity<Product>().HasData(new Product {
            ProductId = 1,
            Name = "OTC College Jacket",
            CategoryId = 1
        }, new Product {
            ProductId = 2,
            Name = "OTC Polo Shirt",
            CategoryId = 2
        });

        #endregion

        #region Variant

        modelBuilder.Entity<Variant>().HasData(new Variant {
            VariantId = 1,
            Name = "Size",
            ProductId = 1
        }, new Variant {
            VariantId = 2,
            Name = "Color",
            ProductId = 1
        }, new Variant {
            VariantId = 3,
            Name = "Size",
            ProductId = 2
        }, new Variant {
            VariantId = 4,
            Name = "Shape",
            ProductId = 2
        });

        modelBuilder.Entity<Type>().HasData(new Type {
            TypeId = 1,
            Name = "Big",
            VariantId = 1
        }, new Type {
            TypeId = 2,
            Name = "Small",
            VariantId = 1
        }, new Type {
            TypeId = 3,
            Name = "White",
            VariantId = 2
        }, new Type {
            TypeId = 4,
            Name = "Red",
            VariantId = 2
        }, new Type {
            TypeId = 5,
            Name = "Long",
            VariantId = 3
        }, new Type {
            TypeId = 6,
            Name = "Short",
            VariantId = 3
        }, new Type {
            TypeId = 7,
            Name = "Men's",
            VariantId = 4
        }, new Type {
            TypeId = 8,
            Name = "Women's",
            VariantId = 4
        });

        #endregion

        #region Combo

        modelBuilder.Entity<Combo>().HasData(new Combo {
            ComboId = 1,
            Stock = byte.MaxValue,
            ProductId = 1,
            Types = new List<Type> {
                new() { TypeId = 1 },
                new() { TypeId = 3 }
            }
        }, new Combo {
            ComboId = 2,
            Stock = byte.MaxValue,
            ProductId = 1,
            Types = new List<Type> {
                new() { TypeId = 2 },
                new() { TypeId = 3 }
            }
        }, new Combo {
            ComboId = 3,
            Stock = byte.MaxValue,
            ProductId = 1,
            Types = new List<Type> {
                new() { TypeId = 1 },
                new() { TypeId = 4 }
            }
        }, new Combo {
            ComboId = 4,
            Stock = byte.MaxValue,
            ProductId = 1,
            Types = new List<Type> {
                new() { TypeId = 2 },
                new() { TypeId = 4 }
            }
        }, new Combo {
            ComboId = 5,
            Stock = byte.MaxValue,
            ProductId = 2,
            Types = new List<Type> {
                new() { TypeId = 5 },
                new() { TypeId = 7 }
            }
        }, new Combo {
            ComboId = 6,
            Stock = byte.MaxValue,
            ProductId = 2,
            Types = new List<Type> {
                new() { TypeId = 5 },
                new() { TypeId = 8 }
            }
        }, new Combo {
            ComboId = 7,
            Stock = byte.MaxValue,
            ProductId = 2,
            Types = new List<Type> {
                new() { TypeId = 6 },
                new() { TypeId = 7 }
            }
        }, new Combo {
            ComboId = 8,
            Stock = 0,
            ProductId = 2,
            Types = new List<Type> {
                new() { TypeId = 6 },
                new() { TypeId = 8 }
            }
        });

        #endregion

        #region Photo

        using var http = new HttpClient();
        const string url = "https://shop.eco.tsi-dev.otc-service.com/";

        var tasks = new[] {
            http.GetByteArrayAsync(url + "1.webp"),
            http.GetByteArrayAsync(url + "2.webp"),
            http.GetByteArrayAsync(url + "3.webp"),
            http.GetByteArrayAsync(url + "4.webp")
        };

        Task.WaitAll(tasks);

        var p1 = Guid.NewGuid();
        var p2 = Guid.NewGuid();
        var p3 = Guid.NewGuid();
        var p4 = Guid.NewGuid();

        modelBuilder.Entity<Storage>().HasData(new Storage {
            Id = p1,
            Data = tasks[0].Result
        }, new Storage {
            Id = p2,
            Data = tasks[1].Result
        }, new Storage {
            Id = p3,
            Data = tasks[2].Result
        }, new Storage {
            Id = p4,
            Data = tasks[3].Result
        });

        modelBuilder.Entity<Photo>().HasData(new Photo {
            PhotoId = 1,
            Cover = true,
            Order = 1,
            ObjectId = p1,
            ProductId = 1
        }, new Photo {
            PhotoId = 2,
            Order = 2,
            ObjectId = p2,
            ProductId = 1
        }, new Photo {
            PhotoId = 3,
            Cover = true,
            Order = 1,
            ObjectId = p3,
            ProductId = 2
        }, new Photo {
            PhotoId = 4,
            Order = 2,
            ObjectId = p4,
            ProductId = 2
        });

        #endregion

        #region Order

        modelBuilder.Entity<Order>().HasData(new Order {
            OrderId = 1,
            UserId = Guid.Parse("e2653b80-9be7-41d0-aff0-524ad0e66944"),
            Status = OrderStatus.Finished,
            CreateAt = DateTime.Now,
            TrackingNumber = "1234567890"
        });

        modelBuilder.Entity<OrderCombo>().HasData(new OrderCombo {
            OrderId = 1,
            ComboId = 1,
            Quantity = 2
        }, new OrderCombo {
            OrderId = 1,
            ComboId = 5,
            Quantity = 3
        });

        modelBuilder.Entity<Comment>().HasData(new Comment {
            CommentId = 1,
            Content = "This is a comment",
            UserId = Guid.Parse("e2653b80-9be7-41d0-aff0-524ad0e66944"),
            CreateAt = DateTime.Now,
            OrderId = 1
        });

        #endregion

        #endregion
    }
}
