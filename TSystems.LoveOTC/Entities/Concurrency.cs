namespace TSystems.LoveOTC.Entities;

using System.ComponentModel.DataAnnotations;

/**
 * <remarks>
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 * </remarks>
 */
public abstract class Concurrency {
    [Timestamp]
    [ConcurrencyCheck]
    public uint Version { get; set; }
}
