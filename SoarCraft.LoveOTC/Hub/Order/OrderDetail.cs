namespace SoarCraft.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record OrderDetail {
    public required List<CartItem> ShopCart { get; init; }

    public required List<string> Comments { get; init; }
}
