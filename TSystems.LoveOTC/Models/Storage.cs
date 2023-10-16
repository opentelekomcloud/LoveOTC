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
public class Storage {
    public Guid Id { get; set; }

    public DateTime? Expires { get; set; }

    [MaxLength(10 * 1024 * 1024)]
    public byte[] Data { get; set; }
}
