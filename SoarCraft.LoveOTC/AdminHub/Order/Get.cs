namespace SoarCraft.LoveOTC.AdminHub;

using Hub;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    public async Task<List<OrderItem>> OrderGetList() {
        return new() {
            new() {
                OrderId = 1,
                Items = new() { "OTC SHIRT - GREY", "OTC Cap - Cap and Cap" },
                Quantity = 2,
                OrderDate = DateTime.Now,
                TrackNumber = "Number123456789",
                Status = Enum.GetName(OrderStatus.Finished)!
            },
            new() {
                OrderId = 2,
                Items = new() { "OTC Cap - Cap and Cap" },
                Quantity = 1,
                OrderDate = DateTime.Now,
                TrackNumber = "Number123456789",
                Status = Enum.GetName(OrderStatus.Finished)!
            },
        };
    }
}
