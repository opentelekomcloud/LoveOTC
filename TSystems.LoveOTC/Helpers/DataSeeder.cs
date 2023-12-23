namespace TSystems.LoveOTC.Helpers;

using Entities;

/**
 * <remarks>
 * @author Aloento
 * @since 1.1.0
 * @version 1.0.0
 * </remarks>
 */
internal static class DataSeeder {
    public static async Task SeedData(this IApplicationBuilder host) {
        await using var scope = host.ApplicationServices.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<ShopContext>();

        var aloento = context.Users.Add(new() {
            UserId = Guid.Parse("e2653b80-9be7-41d0-aff0-524ad0e66944"),
            Name = "Aloento",
            EMail = "me@example.com",
            Phone = "+1 300000000",
            Address = "T-Systems, Budapest, Hungary",
            Admin = true
        }).Entity;

        #region Photo

        using var http = new HttpClient();
        const string url = "http://localhost:5173/";

        var jacket1 = await http.GetByteArrayAsync(url + "Jacket1.png");
        var jacket2 = await http.GetByteArrayAsync(url + "Jacket2.png");

        var tMale1 = await http.GetByteArrayAsync(url + "TMale1.png");
        var tMale2 = await http.GetByteArrayAsync(url + "TMale2.png");

        var tFemale1 = await http.GetByteArrayAsync(url + "TFemale1.png");
        var tFemale2 = await http.GetByteArrayAsync(url + "TFemale2.png");

        #endregion

        #region Jacket

        var jacketCate = context.Categories.Add(new() {
            Name = "T-Jacket"
        }).Entity;

        var jacketProd = context.Products.Add(new() {
            Name = "OTC College Jacket",
            Category = jacketCate,
            Photos = [
                new() {
                    Cover = true,
                    Caption = "CollegJacken Front",
                    Order = 1,
                    Object = new() { Data = jacket1 }
                },
                new() {
                    Caption = "CollegJacken Back",
                    Order = 2,
                    Object = new() { Data = jacket2 }
                },
            ]
        }).Entity;

        var jacSizeVar = context.Variants.Add(new() {
            Name = "Size",
            Product = jacketProd
        }).Entity;

        var jacSType = context.Types.Add(new() {
            Name = "S",
            Variant = jacSizeVar
        }).Entity;

        var jacSComb = context.Combos.Add(new() {
            Stock = 20,
            Product = jacketProd,
            Types = [jacSType]
        }).Entity;

        var jacMType = context.Types.Add(new() {
            Name = "M",
            Variant = jacSizeVar
        }).Entity;

        var jacMComb = context.Combos.Add(new() {
            Stock = 100,
            Product = jacketProd,
            Types = [jacMType]
        }).Entity;

        var jacLType = context.Types.Add(new() {
            Name = "L",
            Variant = jacSizeVar
        }).Entity;

        var jacLComb = context.Combos.Add(new() {
            Stock = 122,
            Product = jacketProd,
            Types = [jacLType]
        }).Entity;

        var jac1XLType = context.Types.Add(new() {
            Name = "XL",
            Variant = jacSizeVar
        }).Entity;

        var jac1XLComb = context.Combos.Add(new() {
            Stock = 110,
            Product = jacketProd,
            Types = [jac1XLType]
        }).Entity;

        var jac2XLType = context.Types.Add(new() {
            Name = "XXL",
            Variant = jacSizeVar
        }).Entity;

        var jac2XLComb = context.Combos.Add(new() {
            Stock = 105,
            Product = jacketProd,
            Types = [jac2XLType]
        }).Entity;

        var jac3XLType = context.Types.Add(new() {
            Name = "XXXL+",
            Variant = jacSizeVar
        }).Entity;

        var jac3XLComb = context.Combos.Add(new() {
            Stock = 43,
            Product = jacketProd,
            Types = [jac3XLType]
        }).Entity;

        #endregion

        #region T-Shirts

        var shirtCate = context.Categories.Add(new() {
            Name = "T-Shirt"
        }).Entity;

        #region Male

        var mShirtProd = context.Products.Add(new() {
            Name = "OTC Male Shirt",
            Category = shirtCate,
            Photos = [
                new() {
                    Cover = true,
                    Caption = "Male T-Shirts Front",
                    Order = 1,
                    Object = new() { Data = tMale1 }
                },
                new() {
                    Caption = "Male T-Shirts Back",
                    Order = 2,
                    Object = new() { Data = tMale2 }
                },
            ]
        }).Entity;

        var mShirtSizeVar = context.Variants.Add(new() {
            Name = "Size",
            Product = mShirtProd
        }).Entity;

        var mShirtSType = context.Types.Add(new() {
            Name = "S",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirtSComb = context.Combos.Add(new() {
            Stock = 25,
            Product = jacketProd,
            Types = [mShirtSType]
        }).Entity;

        var mShirtMType = context.Types.Add(new() {
            Name = "M",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirtMComb = context.Combos.Add(new() {
            Stock = 105,
            Product = jacketProd,
            Types = [mShirtMType]
        }).Entity;

        var mShirtLType = context.Types.Add(new() {
            Name = "L",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirtLComb = context.Combos.Add(new() {
            Stock = 115,
            Product = jacketProd,
            Types = [mShirtLType]
        }).Entity;

        var mShirt1XLType = context.Types.Add(new() {
            Name = "XL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt1XLComb = context.Combos.Add(new() {
            Stock = 115,
            Product = jacketProd,
            Types = [mShirt1XLType]
        }).Entity;

        var mShirt2XLType = context.Types.Add(new() {
            Name = "XXL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt2XLComb = context.Combos.Add(new() {
            Stock = 85,
            Product = jacketProd,
            Types = [mShirt2XLType]
        }).Entity;

        var mShirt3XLType = context.Types.Add(new() {
            Name = "XXXL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt3XLComb = context.Combos.Add(new() {
            Stock = 27,
            Product = jacketProd,
            Types = [mShirt3XLType]
        }).Entity;

        var mShirt4XLType = context.Types.Add(new() {
            Name = "XXXXL+",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt4XLComb = context.Combos.Add(new() {
            Stock = 15,
            Product = jacketProd,
            Types = [mShirt4XLType]
        }).Entity;

        #endregion

        #region Female

        var fShirtProd = context.Products.Add(new() {
            Name = "OTC Female Shirt",
            Category = shirtCate,
            Photos = [
                new() {
                    Cover = true,
                    Caption = "Female T-Shirts Front",
                    Order = 1,
                    Object = new() { Data = tFemale1 }
                },
                new() {
                    Caption = "Female T-Shirts Back",
                    Order = 2,
                    Object = new() { Data = tFemale2 }
                },
            ]
        }).Entity;

        var fShirtSizeVar = context.Variants.Add(new() {
            Name = "Size",
            Product = fShirtProd
        }).Entity;

        var fShirtSType = context.Types.Add(new() {
            Name = "S",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirtSComb = context.Combos.Add(new() {
            Stock = 28,
            Product = jacketProd,
            Types = [fShirtSType]
        }).Entity;

        var fShirtMType = context.Types.Add(new() {
            Name = "M",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirtMComb = context.Combos.Add(new() {
            Stock = 50,
            Product = jacketProd,
            Types = [fShirtMType]
        }).Entity;

        var fShirtLType = context.Types.Add(new() {
            Name = "L",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirtLComb = context.Combos.Add(new() {
            Stock = 55,
            Product = jacketProd,
            Types = [fShirtLType]
        }).Entity;

        var fShirt1XLType = context.Types.Add(new() {
            Name = "XL",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirt1XLComb = context.Combos.Add(new() {
            Stock = 20,
            Product = jacketProd,
            Types = [fShirt1XLType]
        }).Entity;

        var fShirt2XLType = context.Types.Add(new() {
            Name = "XXL",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirt2XLComb = context.Combos.Add(new() {
            Stock = 6,
            Product = jacketProd,
            Types = [fShirt2XLType]
        }).Entity;

        var fShirt3XLType = context.Types.Add(new() {
            Name = "XXXL",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirt3XLComb = context.Combos.Add(new() {
            Stock = 4,
            Product = jacketProd,
            Types = [fShirt3XLType]
        }).Entity;

        #endregion

        #endregion

        #region Order

        context.Orders.Add(new() {
            User = aloento,
            Status = OrderStatus.Shipping,
            CreateAt = DateTime.UtcNow,
            TrackingNumber = Guid.NewGuid().ToString(),
            OrderCombos = [
                new() {
                    Combo = jacSComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = jacMComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = jacLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = jac1XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = jac2XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = jac3XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                }
            ],
            Comments = [
                new() {
                    Content = "Jacket This is a comment no user",
                    CreateAt = DateTime.UtcNow,
                },
                new() {
                    Content = "Jacket This is a comment",
                    User = aloento,
                    CreateAt = DateTime.UtcNow,
                }
            ]
        });

        context.Orders.Add(new() {
            User = aloento,
            Status = OrderStatus.Pending,
            CreateAt = DateTime.UtcNow,
            OrderCombos = [
                new() {
                    Combo = mShirtSComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = mShirtMComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = mShirtLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = mShirt1XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = mShirt2XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = mShirt3XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = mShirt4XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                }
            ],
            Comments = [
                new() {
                    Content = "M Shirt This is a comment no user",
                    CreateAt = DateTime.UtcNow,
                },
                new() {
                    Content = "M Shirt This is a comment",
                    User = aloento,
                    CreateAt = DateTime.UtcNow,
                }
            ]
        });

        context.Orders.Add(new() {
            User = aloento,
            Status = OrderStatus.Processing,
            CreateAt = DateTime.UtcNow,
            OrderCombos = [
                new() {
                    Combo = fShirtSComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = fShirtMComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = fShirtLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = fShirt1XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = fShirt2XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                },
                new() {
                    Combo = fShirt3XLComb,
                    Quantity = (byte)Random.Shared.Next(1, 3),
                }
            ],
            Comments = [
                new() {
                    Content = "F Shirt This is a comment no user",
                    CreateAt = DateTime.UtcNow,
                },
                new() {
                    Content = "F Shirt This is a comment",
                    User = aloento,
                    CreateAt = DateTime.UtcNow,
                }
            ]
        });

        #endregion

        await context.SaveChangesAsync();

        throw new("Seed Success");
    }
}
