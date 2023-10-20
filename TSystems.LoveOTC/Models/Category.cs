// ReSharper disable UnassignedGetOnlyAutoProperty
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
[Index(nameof(Name), IsUnique = true)]
public class Category {
    public uint Id { get; set; }

    [StringLength(15, MinimumLength = 1)]
    public string Name { get; set; }

    public virtual ICollection<Product> Products { get; }
}
