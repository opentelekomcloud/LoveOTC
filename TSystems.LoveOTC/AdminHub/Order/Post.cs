namespace TSystems.LoveOTC.AdminHub;

using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;

internal partial class AdminHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.1.0
     * </remarks>
     */
    public async Task<bool> OrderPostAppend(uint orderId, string cmt) {
        var valid = typeof(Comment)
            .GetProperty(nameof(Comment.Content))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (string.IsNullOrWhiteSpace(cmt) || !valid.IsValid(cmt))
            throw new HubException(valid.FormatErrorMessage(nameof(Comment)));

        var order = await this.Db.Orders
            .Where(x => x.OrderId == orderId)
            .SingleAsync();

        await this.Db.Comments.AddAsync(new() {
            Content = cmt,
            UserId = this.UserId,
            CreateAt = DateTime.UtcNow,
            Order = order,
        });

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.3.0
     * </remarks>
     */
    public async Task<string> OrderPostClose(uint orderId, string reason) {
        var valid = typeof(Comment)
            .GetProperty(nameof(Comment.Content))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (string.IsNullOrWhiteSpace(reason) || !valid.IsValid(reason))
            throw new HubException(valid.FormatErrorMessage("Reason"));

        var order = await this.Db.Orders
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status != OrderStatus.Cancelled)
            .Where(x => x.Status != OrderStatus.Finished)
            .Include(x => x.OrderCombos)
            .ThenInclude(x => x.Combo)
            .SingleAsync();

        if (order.Status is OrderStatus.Pending or OrderStatus.Processing)
            foreach (var oc in order.OrderCombos)
                oc.Combo.Stock += oc.Quantity;

        order.Status = OrderStatus.Finished;
        await this.Db.Comments.AddAsync(new() {
            Content = "[Admin Close] " + reason,
            UserId = this.UserId,
            CreateAt = DateTime.UtcNow,
            Order = order,
        });

        await this.Db.SaveChangesAsync();

        return order.Status.ToString();
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 0.5.0
     * @version 1.1.0
     * </remarks>
     */
    public async Task<bool> OrderPostShip(uint orderId, string? track) {
        var valid = typeof(Order)
            .GetProperty(nameof(Order.TrackingNumber))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (!valid.IsValid(track))
            throw new HubException(valid.FormatErrorMessage(nameof(Order.TrackingNumber)));

        var order = await this.Db.Orders
            .Where(x => x.OrderId == orderId)
            .SingleAsync();

        if (string.IsNullOrWhiteSpace(track)) {
            order.TrackingNumber = null;
            order.Status = OrderStatus.Processing;
        } else {
            order.TrackingNumber = track;
            order.Status = OrderStatus.Shipping;
        }

        return await this.Db.SaveChangesAsync() > 0;
    }

    /**
     * <remarks>
     * @author Aloento
     * @since 1.0.0
     * @version 0.2.0
     * </remarks>
     */
    public async Task<bool> OrderPostAccept(uint orderId) {
        var order = await this.Db.Orders
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status == OrderStatus.Pending)
            .SingleAsync();

        order.Status = OrderStatus.Processing;
        await this.Db.Comments.AddAsync(new() {
            Content = "[Admin Accepted Order]",
            UserId = this.UserId,
            CreateAt = DateTime.UtcNow,
            Order = order,
        });

        return await this.Db.SaveChangesAsync() > 0;
    }
}
