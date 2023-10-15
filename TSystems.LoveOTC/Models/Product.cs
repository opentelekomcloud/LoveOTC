// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.Text.Json;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Product {
    public uint Id { get; set; }

    public string Name { get; set; }

    public uint? CategoryId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Photo> Photos { get; }

    public JsonElement? Description { get; set; }

    public virtual ICollection<Variant> Variants { get; }

    public virtual ICollection<Combo> Combos { get; }
}
