namespace TSystems.LoveOTC.Hub;

using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    [Authorize]
    public async Task<uint> OrderPostNew(CartItem[] cart, string? cmt) {
        var valid = typeof(Comment)
            .GetProperty(nameof(Comment.Content))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(cmt))
            throw new HubException(valid.FormatErrorMessage(nameof(Comment)));

        var order = (await this.Db.Orders.AddAsync(new() {
            UserId = this.UserId,
            Status = OrderStatus.Pending,
            CreateAt = DateTime.UtcNow,
            OrderCombos = new List<OrderCombo>(cart.Length),
            Comments = new List<Comment>(1)
        })).Entity;

        if (!string.IsNullOrWhiteSpace(cmt))
            order.Comments.Add(new() {
                Content = cmt,
                CreateAt = DateTime.UtcNow,
                Order = order
            });

        foreach (var item in cart) {
            if (item.Quantity > 3)
                throw new HubException("No more than 3 of each type.");

            var combo = await this.Db.Combos
                .Where(x => x.IsArchived != true)
                .Where(x => x.ProductId == item.ProdId)
                .Where(x => item.Type.All(
                    i => x.Types
                        .Select(t => t.Name)
                        .Contains(i))
                )
                .SingleAsync();

            order.OrderCombos.Add(new() {
                Order = order,
                Combo = combo,
                Quantity = item.Quantity
            });
        }

        return await this.Db.SaveChangesAsync() > 0
            ? order.OrderId
            : throw new HubException();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    [Authorize]
    public async Task<bool> OrderPostAppend(uint orderId, string cmt) {
        var valid = typeof(Comment)
            .GetProperty(nameof(Comment.Content))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (string.IsNullOrWhiteSpace(cmt) || !valid.IsValid(cmt))
            throw new HubException(valid.FormatErrorMessage(nameof(Comment)));

        var order = await this.Db.Orders
            .Where(x => x.UserId == this.UserId)
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status != OrderStatus.Cancelled)
            .Where(x => x.Status != OrderStatus.Finished)
            .SingleAsync();

        order.Comments.Add(new() {
            Content = cmt,
            CreateAt = DateTime.UtcNow,
            Order = order
        });

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.0.0
     * </remarks>
     */
    [Authorize]
    public async Task<bool> OrderPostCancel(uint orderId, string reason) {
        var valid = typeof(Comment)
            .GetProperty(nameof(Comment.Content))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (string.IsNullOrWhiteSpace(reason) || !valid.IsValid(reason))
            throw new HubException(valid.FormatErrorMessage("Reason"));

        var order = await this.Db.Orders
            .Where(x => x.UserId == this.UserId)
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status != OrderStatus.Cancelled)
            .Where(x => x.Status != OrderStatus.Finished)
            .SingleAsync();

        order.Status = OrderStatus.Cancelled;
        order.Comments.Add(new() {
            Content = "[User Cancel] " + reason,
            CreateAt = DateTime.UtcNow,
            Order = order
        });

        return await this.Db.SaveChangesAsync() > 0;
    }

    // TODO: OrderPostReceived
    // TODO: OrderDelete
}
