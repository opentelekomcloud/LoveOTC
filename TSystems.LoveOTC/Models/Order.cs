// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using Entities;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Order {
    public uint OrderId { get; set; }

    public Guid UserId { get; set; }

    public virtual User User { get; set; }

    public OrderStatus Status { get; set; }

    public DateTime CreateAt { get; set; }

    public string? TrackingNumber { get; set; }

    public virtual ICollection<Combo> Combos { get; }

    public virtual ICollection<OrderCombo> OrderCombos { get; }

    public virtual ICollection<Comment> Comments { get; }
}
