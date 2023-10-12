namespace SoarCraft.LoveOTC.AdminHub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
public record VariantItem {
    public required uint VariantId { get; init; }

    public required string Name { get; init; }

    public required List<string> Types { get; init; }
}
