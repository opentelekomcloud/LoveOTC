namespace TSystems.LoveOTC.Hub;

using System.Collections.Immutable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 1.0.0
     * </remarks>
     */
    [Authorize]
    public async Task<dynamic[]> OrderGetList() =>
        await this.Db.Orders
            .Where(x => x.UserId == this.UserId)
            .Select(x => new {
                x.OrderId,
                Products = x.Combos.Select(c => c.ProductId).ToArray(),
                Quantity = (ushort)x.OrderCombos.Sum(o => o.Quantity)
            })
            .ToArrayAsync();

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<OrderDetail> OrderGetDetail(uint orderId) {
        var cartDb = await this.Db.OrderCombos
            .Where(x => x.OrderId == orderId && x.Order.UserId == this.UserId)
            .Select(x => new {
                x.Combo.ProductId,
                Type = x.Combo.Types
                    .Select(t => t.TypeId)
                    .ToArray(),
                x.Quantity
            })
            .ToArrayAsync();

        var cmtDb = await this.Db.Comments
            .Where(x => x.OrderId == orderId && x.Order.UserId == this.UserId)
            .Select(x => new OrderComment {
                Content = x.Content,
                Time = x.CreateAt,
                User = x.User!.Name
            })
            .ToArrayAsync();

        return new() {
            ShopCart = cartDb
                .Select(x => new CartItem {
                    ProdId = x.ProdId,
                    Cover = x.Cover,
                    Name = x.Name,
                    Type = x.Type.ToImmutableDictionary(k => k.Key, v => v.Value),
                    Quantity = x.Quantity
                })
                .ToImmutableArray(),
            Comments = cmtDb
        };
    }
}
