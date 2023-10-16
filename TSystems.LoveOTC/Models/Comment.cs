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
public class Comment {
    public uint CommentId { get; set; }

    [StringLength(1000)]
    public string Content { get; set; }

    public Guid? UserId { get; set; }

    public virtual User? User { get; set; }

    public DateTime CreateAt { get; set; }

    public uint OrderId { get; set; }

    public virtual Order Order { get; set; }
}
