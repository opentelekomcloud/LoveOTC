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
    public async Task<List<string>> Categories() {
        return new(){
            "T-Shirt",
            "Cap"
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
    public async Task<List<uint>> Products(string category) { 
        var len = Random.Shared.Next(1, 12); 
        var nums = new List<uint>(len);

        for (var i = 0; i < len; i++) {
            nums.Add((uint) Random.Shared.Next(1, 100));
        }

        return nums;
    }
}