#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Photo {
    public uint PhotoId { get; set; }

    public bool? Cover { get; set; }

    [StringLength(100)]
    public string? Caption { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public byte Order { get; set; }

    public Guid ObjectId { get; set; }

    public virtual Storage Object { get; set; }

    public uint ProductId { get; set; }

    public virtual Product Product { get; set; }
}
