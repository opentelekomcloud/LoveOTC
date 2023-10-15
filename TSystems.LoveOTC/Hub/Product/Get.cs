namespace TSystems.LoveOTC.Hub;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
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
    public async Task<List<PhotoItem>> ProdGetCarousel(uint prodId) {
        return new() {
            new() {
                PhotoId = 0,
                Cover = Guid.NewGuid(),
                Caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            },
            new() {
                PhotoId = 1,
                Cover = Guid.NewGuid(),
                Caption = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        };
    }
}
