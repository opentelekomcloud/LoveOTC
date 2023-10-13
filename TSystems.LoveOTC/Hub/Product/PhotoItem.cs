namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record PhotoItem {
    public required uint ObjId { get; init; }

    public required string Cover { get; init; }

    public string? Caption { get; init; }
}
