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
internal class Combo {
    public uint ComboId { get; set; }

    public ushort Stock { get; set; }

    public uint ProductId { get; set; }

    public Product Product { get; set; }

    public ICollection<Type> Types { get; }
}
