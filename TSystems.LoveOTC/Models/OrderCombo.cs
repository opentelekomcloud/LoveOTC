#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace TSystems.LoveOTC.Models;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
public class OrderCombo {
    public uint OrderId { get; set; }

    public virtual Order Order { get; set; }

    public uint ComboId { get; set; }

    public virtual Combo Combo { get; set; }

    public byte Quantity { get; set; }
}
