namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record ProductInfo {
    public required Guid Cover { get; init; }

    public required string Name { get; init; }
}
