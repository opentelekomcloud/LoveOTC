namespace TSystems.LoveOTC.Hub;

using Helpers;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[PublicAPI]
internal partial class ShopHub(ShopContext db, ILogger<ShopHub> logger) : CraftHub<ShopHub, INetClient>(db, logger) {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public override async Task OnConnectedAsync() {
        var ok = Guid.TryParse(this.Context.UserIdentifier, out var uid);

        if (ok) {
            this.Context.Items.TryAdd("UID", uid);
            var exist = await this.Db.Users.AnyAsync(x => x.UserId == uid);

            if (exist)
                this.Logger.UserLogin(this.Name, this.Context.UserIdentifier, this.Context.ConnectionId);
            else {
                await this.Clients.Caller.OnNewUser();
                this.Context.Items.TryAdd("NewUser", true);
            }
        }
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    public async IAsyncEnumerable<byte[]> ObjectStorageGet(Guid objId) {
        var imageUrl = "https://source.unsplash.com/random";
        using var httpClient = new HttpClient();
        using var response = await httpClient.GetAsync(imageUrl, HttpCompletionOption.ResponseHeadersRead);
        response.EnsureSuccessStatusCode();

        await using var stream = await response.Content.ReadAsStreamAsync();
        var buffer = new byte[30 * 1024];

        int bytesRead;
        while ((bytesRead = await stream.ReadAsync(buffer)) > 0)
            yield return buffer[..bytesRead];
    }
}
