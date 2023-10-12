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
    public async Task<bool> UserPostUpdate(PostPersona req) {
        throw new NotImplementedException();
    }
}
