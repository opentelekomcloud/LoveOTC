namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record OrderExtension {
    public required string Status { get; init; }

    public string? TrackNumber { get; init; }

    public required DateTime OrderDate { get; init; }
}
