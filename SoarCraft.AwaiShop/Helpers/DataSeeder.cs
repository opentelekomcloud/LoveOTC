namespace SoarCraft.AwaiShop.Helpers;

using Entities;

/**
 * <remarks>
 * @author Aloento
 * @since 1.1.0
 * @version 0.1.0
 * </remarks>
 */
internal static class DataSeeder {
    public static async Task SeedData(this IApplicationBuilder host) {
        await using var scope = host.ApplicationServices.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<ShopContext>();

        var user = context.Users.Add(new() {
            UserId = Guid.Parse("171B20BE-E180-410D-AAE2-EE28773AA0B7"),
            Name = "Aloento",
            EMail = "me@example.com",
            Phone = "+1 300000000",
            Address = "Address, Address",
            Admin = true
        }).Entity;

        #region Product

        var cate1 = context.Categories.Add(new() {
            Name = "T-Jacket"
        }).Entity;

        var cate2 = context.Categories.Add(new() {
            Name = "T-Polo"
        }).Entity;

        using var http = new HttpClient();
        const string url = "http://localhost:5173/";

        var p1 = await http.GetByteArrayAsync(url + "1.jpg");
        var p2 = await http.GetByteArrayAsync(url + "2.jpg");
        var p3 = await http.GetByteArrayAsync(url + "3.jpg");
        var p4 = await http.GetByteArrayAsync(url + "4.jpg");

        var prod1 = context.Products.Add(new() {
            Name = "Awai College Jacket",
            Category = cate1,
            Photos = [
                new() {
                    Cover = true,
                    Caption = "Demo Caption",
                    Order = 1,
                    Object = new() { Data = p1 }
                },
                new() {
                    Caption = "Demo Caption",
                    Order = 2,
                    Object = new() { Data = p2 }
                },
            ]
        }).Entity;

        var prod2 = context.Products.Add(new() {
            Name = "Awai Polo Shirt",
            Category = cate2,
            Photos = [
                new() {
                    Cover = true,
                    Caption = "Demo Caption",
                    Order = 1,
                    Object = new() { Data = p3 }
                },
                new() {
                    Caption = "Demo Caption",
                    Order = 2,
                    Object = new() { Data = p4 }
                },
            ]
        }).Entity;

        #endregion

        #region Variant

        var var11 = context.Variants.Add(new() {
            Name = "Size",
            Product = prod1
        }).Entity;

        var var12 = context.Variants.Add(new() {
            Name = "Color",
            Product = prod1
        }).Entity;

        var var21 = context.Variants.Add(new() {
            Name = "Size",
            Product = prod2
        }).Entity;

        var var22 = context.Variants.Add(new() {
            Name = "Shape",
            Product = prod2
        }).Entity;

        #endregion

        #region Type

        var type111 = context.Types.Add(new() {
            Name = "Big",
            Variant = var11
        }).Entity;

        var type112 = context.Types.Add(new() {
            Name = "Small",
            Variant = var11
        }).Entity;

        var type121 = context.Types.Add(new() {
            Name = "White",
            Variant = var12
        }).Entity;

        var type122 = context.Types.Add(new() {
            Name = "Red",
            Variant = var12
        }).Entity;

        var type211 = context.Types.Add(new() {
            Name = "Long",
            Variant = var21
        }).Entity;

        var type212 = context.Types.Add(new() {
            Name = "Short",
            Variant = var21
        }).Entity;

        var type221 = context.Types.Add(new() {
            Name = "Men's",
            Variant = var22
        }).Entity;

        var type222 = context.Types.Add(new() {
            Name = "Women's",
            Variant = var22
        }).Entity;

        #endregion

        #region Combo

        var combo11 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod1,
            Types = [
                type111,
                type121
            ]
        }).Entity;

        var combo12 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod1,
            Types = [
                type112,
                type121
            ]
        }).Entity;

        var combo13 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod1,
            Types = [
                type111,
                type122
            ]
        }).Entity;

        var combo14 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod1,
            Types = [
                type112,
                type122
            ]
        }).Entity;

        var combo21 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod2,
            Types = [
                type211,
                type221
            ]
        }).Entity;

        var combo22 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod2,
            Types = [
                type211,
                type222
            ]
        }).Entity;

        var combo23 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod2,
            Types = [
                type212,
                type221
            ]
        }).Entity;

        var combo24 = context.Combos.Add(new() {
            Stock = (ushort)Random.Shared.Next(1, ushort.MaxValue),
            Product = prod2,
            Types = [
                type212,
                type222
            ]
        }).Entity;

        #endregion

        #region Order

        context.Orders.Add(new() {
            User = user,
            Status = OrderStatus.Shipping,
            CreateAt = DateTime.UtcNow,
            TrackingNumber = "1234567890",
            OrderCombos = [
                new() {
                    Combo = combo11,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo12,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo13,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo14,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo21,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo22,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo23,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = combo24,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                }
            ],
            Comments = [
                new() {
                    Content = "This is a comment no user",
                    CreateAt = DateTime.UtcNow,
                },
                new() {
                    Content = "This is a comment",
                    User = user,
                    CreateAt = DateTime.UtcNow,
                }
            ]
        });

        #endregion

        await context.SaveChangesAsync();

        throw new("Seed Success");
    }
}
