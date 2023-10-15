namespace TSystems.LoveOTC;

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

    protected string? Name => this.Context.User?.FindFirstValue("preferred_username");
}
