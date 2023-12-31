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
     * @version 1.0.1
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

        order.Comments.Add(new() {
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
     * @version 1.0.0
     * </remarks>
     */
    public async Task<bool> OrderPostClose(uint orderId, string reason) {
        var valid = typeof(Comment)
            .GetProperty(nameof(Comment.Content))!
            .GetCustomAttribute<StringLengthAttribute>()!;

        if (string.IsNullOrWhiteSpace(reason) || !valid.IsValid(reason))
            throw new HubException(valid.FormatErrorMessage("Reason"));

        var order = await this.Db.Orders
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status != OrderStatus.Cancelled)
            .Where(x => x.Status != OrderStatus.Finished)
            .SingleAsync();

        order.Status = OrderStatus.Finished;
        order.Comments.Add(new() {
            Content = "[Admin Close] " + reason,
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
     * @version 1.0.0
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
     * @version 0.1.0
     * </remarks>
     */
    public async Task<bool> OrderPostAccept(uint orderId) {
        var order = await this.Db.Orders
            .Where(x => x.OrderId == orderId)
            .Where(x => x.Status == OrderStatus.Pending)
            .SingleAsync();

        order.Status = OrderStatus.Processing;
        order.Comments.Add(new() {
            Content = "[Admin Accepted Order]",
            UserId = this.UserId,
            CreateAt = DateTime.UtcNow,
            Order = order,
        });

        return await this.Db.SaveChangesAsync() > 0;
    }
}
