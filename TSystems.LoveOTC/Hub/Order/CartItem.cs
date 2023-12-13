namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 * </remarks>
 */
internal record CartItem {
    public required uint ProdId { get; init; }

    public required string[] Type { get; init; }

    public required byte Quantity { get; init; }
}
