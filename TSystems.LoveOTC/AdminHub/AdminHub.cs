namespace TSystems.LoveOTC.AdminHub;

using Helpers;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[PublicAPI]
[Authorize]
internal partial class AdminHub(ShopContext db, ILogger<AdminHub> logger) : CraftHub<AdminHub, IAdminClient>(db, logger) {
    private Task<bool?> isAdmin {
        get {
            var ok = Guid.TryParse(this.Context.UserIdentifier, out var uid);
            if (!ok) return Task.FromResult<bool?>(false);

            return this.Db.Users.Where(x => x.UserId == uid).Select(x => x.Admin).FirstOrDefaultAsync();
        }
    }

    public override async Task OnConnectedAsync() {
        var admin = await this.isAdmin;

        if (admin is true)
            this.Logger.AdminLogin(this.Name, this.Context);
        else {
            this.Logger.FailedAdminLogin(this.Name, this.Context);
            this.Context.Abort();
        }
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    protected static async Task<byte[]> EncodeWebp(Stream input) {
        using var img = await Image.LoadAsync(input);

        if (img.Width < 1600 || img.Height < 1600 || img.Width != img.Height)
            throw new HubException(
                $"Image should be larger than 1600px and 1:1 ratio, currently {img.Width} : {img.Height}");

        await using var output = new MemoryStream();
        await img.SaveAsWebpAsync(output);

        return output.ToArray();
    }
}
