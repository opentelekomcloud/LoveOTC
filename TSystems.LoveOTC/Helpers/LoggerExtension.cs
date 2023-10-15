namespace TSystems.LoveOTC.Helpers;

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
        Message = "User {name} : [{uid}] Logged from [{cid}]"
    )]
    public static partial void UserLogin(this ILogger logger, string? name, string? uid, string cid);

    [LoggerMessage(
        EventId = 2002,
        Level = LogLevel.Information,
        Message = "New User {name} : [{uid}] Logged from [{cid}]"
    )]
    public static partial void NewUser(this ILogger logger, string? name, string? uid, string cid);

    [LoggerMessage(
        EventId = 2001,
        Level = LogLevel.Information,
        Message = "Admin {name} : [{uid}] Logged from [{cid}]"
    )]
    public static partial void AdminLogin(this ILogger logger, string? name, string? uid, string cid);

    [LoggerMessage(
        EventId = 3001,
        Level = LogLevel.Warning,
        Message = "Failed Admin Login from {name} : [{uid}] [{cid}]"
    )]
    public static partial void FailedAdminLogin(this ILogger logger, string? name, string? uid, string cid);
}
