#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Storage {
    public Guid Id { get; set; }

    public DateTime? Expires { get; set; }

    public string Hash { get; set; }

    public byte[] Data { get; set; }
}
