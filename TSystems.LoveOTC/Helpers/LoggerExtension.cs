namespace TSystems.LoveOTC.Helpers;

using Microsoft.AspNetCore.SignalR;

/**
 * <remarks>
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 * </remarks>
 */
internal static partial class LoggerExtension {
    [LoggerMessage(
        EventId = 1001,
        Level = LogLevel.Debug,
        Message = "User {name} : [{uid}] Logged from [{ip}]"
    )]
    private static partial void userLogin(ILogger logger, string? name, string? uid, string? ip);

    public static void UserLogin(this ILogger logger, string? name, HubCallerContext ctx) =>
        userLogin(logger, name, ctx.UserIdentifier, ctx.GetHttpContext()?.Connection.RemoteIpAddress?.ToString());

    [LoggerMessage(
        EventId = 2002,
        Level = LogLevel.Information,
        Message = "New User {name} : [{uid}] Logged from [{ip}]"
    )]
    private static partial void newUser(ILogger logger, string? name, string? uid, string? ip);

    public static void NewUser(this ILogger logger, string? name, HubCallerContext ctx) =>
        newUser(logger, name, ctx.UserIdentifier, ctx.GetHttpContext()?.Connection.RemoteIpAddress?.ToString());

    [LoggerMessage(
        EventId = 2001,
        Level = LogLevel.Information,
        Message = "Admin {name} : [{uid}] Logged from [{ip}]"
    )]
    private static partial void adminLogin(ILogger logger, string? name, string? uid, string? ip);

    public static void AdminLogin(this ILogger logger, string? name, HubCallerContext ctx) =>
        adminLogin(logger, name, ctx.UserIdentifier, ctx.GetHttpContext()?.Connection.RemoteIpAddress?.ToString());

    [LoggerMessage(
        EventId = 3001,
        Level = LogLevel.Warning,
        Message = "Failed Admin Login from {name} : [{uid}] [{ip}]"
    )]
    private static partial void failedAdminLogin(ILogger logger, string? name, string? uid, string? ip);

    public static void FailedAdminLogin(this ILogger logger, string? name, HubCallerContext ctx) =>
        failedAdminLogin(logger, name, ctx.UserIdentifier, ctx.GetHttpContext()?.Connection.RemoteIpAddress?.ToString());

    [LoggerMessage(
        EventId = 3002,
        Level = LogLevel.Warning,
        Message = "{from} Grant Admin for {to} : [{uid}] [{ip}]"
    )]
    private static partial void grantAdmin(ILogger logger, string? from, Guid? to, string? uid, string? ip);

    public static void GrantAdmin(this ILogger logger, string? from, Guid? to, HubCallerContext ctx) =>
        grantAdmin(logger, from, to, ctx.UserIdentifier, ctx.GetHttpContext()?.Connection.RemoteIpAddress?.ToString());

    [LoggerMessage(
        EventId = 3003,
        Level = LogLevel.Warning,
        Message = "{from} Revoke Admin for {to} : [{uid}] [{ip}]"
    )]
    private static partial void revokeAdmin(ILogger logger, string? from, Guid? to, string? uid, string? ip);

    public static void RevokeAdmin(this ILogger logger, string? from, Guid? to, HubCallerContext ctx) =>
        grantAdmin(logger, from, to, ctx.UserIdentifier, ctx.GetHttpContext()?.Connection.RemoteIpAddress?.ToString());
}
