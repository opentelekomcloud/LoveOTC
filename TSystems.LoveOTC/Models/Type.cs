// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.ComponentModel.DataAnnotations;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Type {
    public uint TypeId { get; set; }

    [StringLength(15)]
    public string Name { get; set; }

    public uint VariantId { get; set; }

    public virtual Variant Variant { get; set; }

    public virtual ICollection<Combo> Combos { get; }
}
