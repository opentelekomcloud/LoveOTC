namespace TSystems.LoveOTC;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal static class Shared {
#if DEBUG
    public const bool Dev = true;
#else
    public const bool Dev = false;
#endif

    public const string App = nameof(LoveOTC);
}
