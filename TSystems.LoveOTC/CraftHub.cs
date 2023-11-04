namespace TSystems.LoveOTC;

using System;
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

    protected List<Func<Task>> OnDisconnect { get; } = new();

    public override async Task OnDisconnectedAsync(Exception? _) {
        foreach (var action in this.OnDisconnect)
            await action();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    protected async Task<Stream> HandleByteStream(IAsyncEnumerable<byte[]> input, ulong max, string maxStr) {
        var stream = new MemoryStream();
        var count = 0UL;

        await foreach (var chunk in input) {
            count += (ulong)chunk.Length;
            if (count > max) {
                _ = stream.DisposeAsync().ConfigureAwait(false);
                throw new HubException($"File size exceed {maxStr}");
            }

            await stream.WriteAsync(chunk);
        }

        stream.Seek(0, SeekOrigin.Begin);
        return stream;
    }
}
