namespace TSystems.LoveOTC.AdminHub;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<ProductItem>> ProductGetList() {
        return new() {
            new() {
                ProductId = 1,
                Cover = Guid.NewGuid(),
                Name = "OTC SHIRT - GREY",
                Category = "Clothes",
                Variant = 2,
                Combo = 4,
                Stock = 10
            },
            new() {
                ProductId = 2,
                Cover = Guid.NewGuid(),
                Name = "OTC Cap - Cap and Cap",
                Category = "Hat",
                Variant = 2,
                Combo = 4,
                Stock = 20
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
    public async Task<string> ProductGetName(uint prodId) {
        return "OTC SHIRT - GREY";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<string> ProductGetCategory(uint prodId) {
        return "Clothes";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<VariantItem>> ProductGetVariants(uint prodId) {
        return new() {
            new() {
                VariantId = 1,
                Name = "Color",
                Types = new() { "White", "Red" }
            },
            new() {
                VariantId = 2,
                Name = "Size",
                Types = new() { "Big", "Small" }
            }
        };
    }
}
