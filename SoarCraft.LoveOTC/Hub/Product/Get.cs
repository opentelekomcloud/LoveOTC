namespace SoarCraft.LoveOTC.Hub;

using JetBrains.Annotations;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [PublicAPI]
    public async Task<ProductInfo> ProdGetBasic(uint prodId) {
        return new() {
            Cover = $"https://picsum.photos/{Random.Shared.Next(500, 1000)}",
            Name = $"Product {prodId}"
        };
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [PublicAPI]
    public async Task<byte> ProdGetLimit(uint prodId) {
        return (byte)Random.Shared.Next(10);
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [PublicAPI]
    public async Task<List<ComboItem>> ProdGetCombo(uint prodId) {
        if (prodId > 100)
            throw new KeyNotFoundException("Product Not Found");

        return new() {
            new() {
                ComboId = 1,
                Combo = new() {
                    {"Color", "White"},
                    {"Size", "Big"}
                },
                Stock = 8
            },
            new() {
                ComboId = 2,
                Combo = new() {
                    {"Color", "Red"},
                    {"Size", "Small"}
                },
                Stock = 6
            },
            new() {
                ComboId = 3,
                Combo = new() {
                    {"Color", "White"},
                    {"Size", "Big"}
                },
                Stock = 10
            },
            new() {
                ComboId = 4,
                Combo = new() {
                    {"Color", "Red"},
                    {"Size", "Small"}
                },
                Stock = 4
            }
        };
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [PublicAPI]
    public async Task<List<PhotoItem>> ProdGetCarousel(uint prodId) {
        return new() {
            new() {
                ObjId = 0,
                Cover = "https://picsum.photos/550",
                Caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
            new() {
                ObjId = 1,
                Cover = "https://picsum.photos/650",
                Caption = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        };
    }
}
