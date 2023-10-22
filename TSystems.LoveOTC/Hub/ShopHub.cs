namespace TSystems.LoveOTC.Hub;

using Helpers;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
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
                this.Logger.UserLogin(this.Name, this.Context);
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
     * @version 1.0.0
     * </remarks>
     */
    public async IAsyncEnumerable<byte[]> ObjectStorageGet(Guid objId) {
        var exp = await this.Db.Objects
            .Where(x => x.Id == objId)
            .Select(x => x.Expires)
            .SingleAsync();

        if (exp is not null && exp > DateTime.UtcNow) {
            await this.Db.Objects.Where(x => x.Id == objId).ExecuteDeleteAsync();
            throw new HubException("Object Expired");
        }

        await using var command = this.Db.Objects
            .Where(x => x.Id == objId)
            .Select(x => x.Data)
            .CreateDbCommand();

        await command.Connection!.OpenAsync();
        await using var reader = await command.ExecuteReaderAsync();
        await reader.ReadAsync();

        var buffer = new byte[30 * 1024];
        int bytesRead;

        await using var stream = reader.GetStream(0);
        while ((bytesRead = await stream.ReadAsync(buffer)) > 0)
            yield return buffer[..bytesRead];
    }
}
