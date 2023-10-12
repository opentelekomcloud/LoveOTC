namespace SoarCraft.LoveOTC.Hub;

using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [PublicAPI]
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
    [PublicAPI]
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
    [PublicAPI]
    [Authorize]
    public async Task<bool> OrderPostCancel(string orderId, string reason) {
        throw new NotImplementedException();
    }
}
