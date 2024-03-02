namespace TSystems.LoveOTC.Helpers;
/**
 * <remarks>
 * @author Aloento
 * @since 1.1.0
 * @version 1.0.0
 * </remarks>
 */
internal static class DataSeeder {
    public static async Task SeedData(IApplicationBuilder host) {
        await using var scope = host.ApplicationServices.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<ShopContext>();

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
                    Order = 1,
                    Object = new() { Data = jacket1 }
                },
                new() {
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
            Stock = 51,
            Product = jacketProd,
            Types = [jacSType]
        }).Entity;

        var jacMType = context.Types.Add(new() {
            Name = "M",
            Variant = jacSizeVar
        }).Entity;

        var jacMComb = context.Combos.Add(new() {
            Stock = 120,
            Product = jacketProd,
            Types = [jacMType]
        }).Entity;

        var jacLType = context.Types.Add(new() {
            Name = "L",
            Variant = jacSizeVar
        }).Entity;

        var jacLComb = context.Combos.Add(new() {
            Stock = 115,
            Product = jacketProd,
            Types = [jacLType]
        }).Entity;

        var jac1XLType = context.Types.Add(new() {
            Name = "XL",
            Variant = jacSizeVar
        }).Entity;

        var jac1XLComb = context.Combos.Add(new() {
            Stock = 52,
            Product = jacketProd,
            Types = [jac1XLType]
        }).Entity;

        var jac2XLType = context.Types.Add(new() {
            Name = "2XL",
            Variant = jacSizeVar
        }).Entity;

        var jac2XLComb = context.Combos.Add(new() {
            Stock = 42,
            Product = jacketProd,
            Types = [jac2XLType]
        }).Entity;

        var jac3XLType = context.Types.Add(new() {
            Name = "3XL",
            Variant = jacSizeVar
        }).Entity;

        var jac3XLComb = context.Combos.Add(new() {
            Stock = 9,
            Product = jacketProd,
            Types = [jac3XLType]
        }).Entity;

        var jac4XLType = context.Types.Add(new() {
            Name = "4XL",
            Variant = jacSizeVar
        }).Entity;

        var jac4XLComb = context.Combos.Add(new() {
            Stock = 4,
            Product = jacketProd,
            Types = [jac4XLType]
        }).Entity;

        var jac5XLType = context.Types.Add(new() {
            Name = "5XL",
            Variant = jacSizeVar
        }).Entity;

        var jac5XLComb = context.Combos.Add(new() {
            Stock = 1,
            Product = jacketProd,
            Types = [jac5XLType]
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
                    Order = 1,
                    Object = new() { Data = tMale1 }
                },
                new() {
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
            Stock = 59,
            Product = mShirtProd,
            Types = [mShirtSType]
        }).Entity;

        var mShirtMType = context.Types.Add(new() {
            Name = "M",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirtMComb = context.Combos.Add(new() {
            Stock = 145,
            Product = mShirtProd,
            Types = [mShirtMType]
        }).Entity;

        var mShirtLType = context.Types.Add(new() {
            Name = "L",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirtLComb = context.Combos.Add(new() {
            Stock = 145,
            Product = mShirtProd,
            Types = [mShirtLType]
        }).Entity;

        var mShirt1XLType = context.Types.Add(new() {
            Name = "XL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt1XLComb = context.Combos.Add(new() {
            Stock = 78,
            Product = mShirtProd,
            Types = [mShirt1XLType]
        }).Entity;

        var mShirt2XLType = context.Types.Add(new() {
            Name = "2XL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt2XLComb = context.Combos.Add(new() {
            Stock = 69,
            Product = mShirtProd,
            Types = [mShirt2XLType]
        }).Entity;

        var mShirt3XLType = context.Types.Add(new() {
            Name = "3XL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt3XLComb = context.Combos.Add(new() {
            Stock = 25,
            Product = mShirtProd,
            Types = [mShirt3XLType]
        }).Entity;

        var mShirt4XLType = context.Types.Add(new() {
            Name = "4XL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt4XLComb = context.Combos.Add(new() {
            Stock = 8,
            Product = mShirtProd,
            Types = [mShirt4XLType]
        }).Entity;

        var mShirt5XLType = context.Types.Add(new() {
            Name = "5XL",
            Variant = mShirtSizeVar
        }).Entity;

        var mShirt5XLComb = context.Combos.Add(new() {
            Stock = 5,
            Product = mShirtProd,
            Types = [mShirt5XLType]
        }).Entity;

        #endregion

        #region Female

        var fShirtProd = context.Products.Add(new() {
            Name = "OTC Female Shirt",
            Category = shirtCate,
            Photos = [
                new() {
                    Order = 1,
                    Object = new() { Data = tFemale1 }
                },
                new() {
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
            Stock = 29,
            Product = fShirtProd,
            Types = [fShirtSType]
        }).Entity;

        var fShirtMType = context.Types.Add(new() {
            Name = "M",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirtMComb = context.Combos.Add(new() {
            Stock = 32,
            Product = fShirtProd,
            Types = [fShirtMType]
        }).Entity;

        var fShirtLType = context.Types.Add(new() {
            Name = "L",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirtLComb = context.Combos.Add(new() {
            Stock = 25,
            Product = fShirtProd,
            Types = [fShirtLType]
        }).Entity;

        var fShirt1XLType = context.Types.Add(new() {
            Name = "XL",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirt1XLComb = context.Combos.Add(new() {
            Stock = 10,
            Product = fShirtProd,
            Types = [fShirt1XLType]
        }).Entity;

        var fShirt2XLType = context.Types.Add(new() {
            Name = "2XL",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirt2XLComb = context.Combos.Add(new() {
            Stock = 4,
            Product = fShirtProd,
            Types = [fShirt2XLType]
        }).Entity;

        var fShirt3XLType = context.Types.Add(new() {
            Name = "3XL",
            Variant = fShirtSizeVar
        }).Entity;

        var fShirt3XLComb = context.Combos.Add(new() {
            Stock = 2,
            Product = fShirtProd,
            Types = [fShirt3XLType]
        }).Entity;

        #endregion

        #endregion

        await context.SaveChangesAsync();

        throw new("Seed Success");
    }
}
