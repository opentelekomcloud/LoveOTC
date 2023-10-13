namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record CartItem {
    public required uint OrderId { get; init; }

    public required uint ProdId { get; init; }

    public required string Cover { get; init; }

    public required string Name { get; init; }

    public required Dictionary<string, string> Type { get; init; }

    public required byte Quantity { get; init; }
}
