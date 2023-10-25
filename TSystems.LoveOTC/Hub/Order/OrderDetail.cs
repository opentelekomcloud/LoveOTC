namespace TSystems.LoveOTC.Hub;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal record OrderDetail {
    public required ICollection<CartItem> ShopCart { get; init; }

    public required ICollection<OrderComment> Comments { get; init; }
}
