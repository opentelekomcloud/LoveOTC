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
                Cover = "https://picsum.photos/550",
                Name = "OTC SHIRT - GREY",
                Category = "Clothes",
                Variant = 2,
                Combo = 4,
                Stock = 10
            },
            new() {
                ProductId = 2,
                Cover = "https://picsum.photos/600",
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
    public async Task<string> ProductGetName(string prodId) {
        return "OTC SHIRT - GREY";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<string> ProductGetCategory(string prodId) {
        return "Clothes";
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<VariantItem>> ProductGetVariants(string prodId) {
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
