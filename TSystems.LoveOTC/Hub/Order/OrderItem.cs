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

    public required ICollection<string> Items { get; init; }

    public required ushort Quantity { get; init; }
}
