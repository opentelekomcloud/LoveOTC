namespace TSystems.LoveOTC.Models;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Product {
    public uint Id { get; set; }

    public Guid? ObjectId { get; set; }

    public Storage? Object { get; set; }
}
