namespace TSystems.LoveOTC.AdminHub;

internal partial class AdminHub {
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
