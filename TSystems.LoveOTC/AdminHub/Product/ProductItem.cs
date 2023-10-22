namespace TSystems.LoveOTC.AdminHub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
public record ProductItem {
    public required uint ProductId { get; init; }

    public required Guid Cover { get; init; }

    public required string Name { get; init; }

    public required string Category { get; init; }

    public required byte Variant { get; init; }

    public required byte Combo { get; init; }

    public required uint Stock { get; init; }
}
