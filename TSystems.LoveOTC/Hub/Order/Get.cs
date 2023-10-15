namespace TSystems.LoveOTC.Hub;

using Entities;
using Microsoft.AspNetCore.Authorization;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
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
            }
        };
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<OrderDetail> OrderGetDetail(uint orderId) {
        var shopCart = new List<CartItem> {
            new() {
                OrderId = 1,
                ProdId = (uint)Random.Shared.Next(1, 10),
                Cover = "https://picsum.photos/550",
                Name = "OTC SHIRT - GREY",
                Type = new() {
                    { "Color", "White" },
                    { "Size", "S" }
                },
                Quantity = 1
            },
            new() {
                OrderId = 2,
                ProdId = (uint)Random.Shared.Next(1, 10),
                Cover = "https://picsum.photos/600",
                Name = "OTC Cap - Cap and Cap",
                Type = new() {
                    { "Color", "Red" },
                    { "Size", "Long and Long" }
                },
                Quantity = 1
            }
        };

        var comments = Enumerable.Range(0, 10).Select(_ => Guid.NewGuid().ToString()).ToList();

        return new() {
            ShopCart = shopCart,
            Comments = comments
        };
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<OrderExtension> OrderGetExtension(uint orderId) {
        return new() {
            OrderDate = DateTime.Now,
            TrackNumber = "Number123456789",
            Status = Enum.GetName(OrderStatus.Finished)!
        };
    }
}
