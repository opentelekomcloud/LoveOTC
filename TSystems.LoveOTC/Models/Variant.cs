// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Variant {
    public uint VariantId { get; set; }

    public string Name { get; set; }

    public virtual ICollection<Type> Types { get; }

    public uint ProductId { get; set; }

    public virtual Product Product { get; set; }
}
