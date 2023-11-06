// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.ComponentModel.DataAnnotations;
using Entities;
using Microsoft.EntityFrameworkCore;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 * </remarks>
 */
[Index(nameof(VariantId), nameof(Name), IsUnique = true)]
public class Type : Concurrency, IRemoveHolder {
    public uint TypeId { get; set; }

    [StringLength(15, MinimumLength = 1)]
    public string Name { get; set; }

    public uint VariantId { get; set; }

    public virtual Variant Variant { get; set; }

    public bool? IsRemoved { get; set; }

    public virtual ICollection<Combo> Combos { get; init; }

    public virtual ICollection<ComboType> ComboTypes { get; init; }
}
