namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record ComboItem {
    public required uint ComboId { get; init; }

    public required IDictionary<string, string> Combo { get; init; }

    public required ushort Stock { get; init; }
}
