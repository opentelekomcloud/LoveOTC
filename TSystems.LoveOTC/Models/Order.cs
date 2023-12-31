// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
public class Order : Concurrency {
    public uint OrderId { get; set; }

    public Guid UserId { get; set; }

    public virtual User User { get; set; }

    public OrderStatus Status { get; set; }

    [Column("timestamp without time zone")]
    public DateTime CreateAt { get; set; }

    [StringLength(50, MinimumLength = 6)]
    public string? TrackingNumber { get; set; }

    public virtual ICollection<Combo> Combos { get; init; }

    public virtual ICollection<OrderCombo> OrderCombos { get; init; }

    public virtual ICollection<Comment> Comments { get; init; }
}
