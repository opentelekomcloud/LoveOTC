// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Entities;
using Microsoft.EntityFrameworkCore;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[Index(nameof(Name), IsUnique = true)]
public class Product : Concurrency, IRemoveHolder {
    public uint ProductId { get; set; }

    [StringLength(50, MinimumLength = 1)]
    public string Name { get; set; }

    public uint? CategoryId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Photo> Photos { get; }

    public JsonElement? Description { get; set; }

    public bool? IsRemoved { get; set; }

    public virtual ICollection<Variant> Variants { get; }

    public virtual ICollection<Combo> Combos { get; }
}
