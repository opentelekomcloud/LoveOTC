namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record OrderItem : OrderExtension {
    public required uint OrderId { get; init; }

    public required List<string> Items { get; init; }

    public required byte Quantity { get; init; }
}
