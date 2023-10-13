namespace TSystems.LoveOTC.Hub;

using Microsoft.AspNetCore.Authorization;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<uint> OrderPostNew(List<CartItem> cart, string? cmt) {
        return (uint)Random.Shared.Next(100);
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> OrderPostAppend(string orderId, string cmt) {
        throw new NotImplementedException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<bool> OrderPostCancel(string orderId, string reason) {
        throw new NotImplementedException();
    }
}
