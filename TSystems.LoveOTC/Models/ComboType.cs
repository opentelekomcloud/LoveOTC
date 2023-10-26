#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

using Entities;

/**
 * <remarks>
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 * </remarks>
 */
public class ComboType : Concurrency {
    public uint ComboId { get; set; }

    public virtual Combo Combo { get; set; }

    public uint TypeId { get; set; }

    public virtual Type Type { get; set; }
}
