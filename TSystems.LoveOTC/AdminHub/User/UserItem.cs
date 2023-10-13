namespace TSystems.LoveOTC.AdminHub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record UserItem {
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required string EMail { get; set; }

    public bool? Admin { get; set; }
}
