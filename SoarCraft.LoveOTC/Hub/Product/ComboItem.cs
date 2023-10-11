namespace SoarCraft.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record ComboItem {
    public required uint ComboId { get; init; }

    public required Dictionary<string, string> Combo { get; init; }

    public required ushort Stock { get; init; }
}
