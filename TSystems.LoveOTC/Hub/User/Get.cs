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
    public async Task<Persona> UserGetMe() {
        return new() {
            Name = "Aloento",
            Phone = "+36 300000000",
            EMail = "Aloento@T-Systems.com",
            Address = string.Concat(Enumerable.Range(0, 10).Select(_ => Guid.NewGuid().ToString()))
        };
    }
}
