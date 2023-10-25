namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 * </remarks>
 */
internal record OrderComment {
    public required string Content { get; init; }

    public required DateTime Time { get; init; }

    public string User { get; init; } = "You";
}
