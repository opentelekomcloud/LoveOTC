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
public class Combo : Concurrency, IArchive {
    public uint ComboId { get; set; }

    public ushort Stock { get; set; }

    public uint ProductId { get; set; }

    public virtual Product Product { get; set; }

    public virtual ICollection<Type> Types { get; set; }

    public virtual ICollection<ComboType> ComboTypes { get; init; }

    public virtual ICollection<Order> Orders { get; init; }

    public virtual ICollection<OrderCombo> OrderCombos { get; init; }

    public bool? IsArchived { get; set; }
}
