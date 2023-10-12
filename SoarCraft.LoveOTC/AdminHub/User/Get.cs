namespace SoarCraft.LoveOTC.AdminHub;

using Hub;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<Persona> UserGetOrderUser(string orderId) {
        return new() {
            Name = "Aloento",
            Phone = "+36 300000000",
            EMail = "Aloento@T-Systems.com",
            Address = string.Concat(Enumerable.Range(0, 10).Select(_ => Guid.NewGuid().ToString()))
        };
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<UserItem>> UserGetList() {
        return new()
        {
            new() {
                Id = Guid.NewGuid(),
                Name = "Aloento",
                EMail = "Aloento@T-Systems.com",
                Admin = true
            },
            new() {
                Id = Guid.NewGuid(),
                Name = "SomeOne",
                EMail = "SomeOne@T-Systems.com"
            }
        };
    }
}
