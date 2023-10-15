namespace TSystems.LoveOTC;

using System.Security.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

/**
 * <remarks>
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 * </remarks>
 */
internal abstract class CraftHub<TSelf, TClient>(ShopContext db, ILogger<TSelf> logger) : Hub<TClient> where TClient : class {
    protected ShopContext Db { get; } = db;

    protected ILogger<TSelf> Logger { get; } = logger;

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    protected Guid UserId {
        get {
            var has = this.Context.Items.TryGetValue("UID", out var uid);
            if (has) return (Guid)uid!;

            var ok = Guid.TryParse(this.Context.UserIdentifier, out var parse);
            if (!ok) {
                this.Context.Abort();
                throw new InvalidCredentialException();
            }

            this.Context.Items.TryAdd("UID", parse);
            return parse;
        }
    }

    protected string? Name => this.Context.User?.FindFirstValue("preferred_username");
}
