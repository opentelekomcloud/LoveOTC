namespace SoarCraft.LoveOTC.Hub;

using System.ComponentModel.DataAnnotations;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Persona {
    public required string Name { get; set; }

    [Phone]
    public required string Phone { get; set; }

    [EmailAddress]
    public required string EMail { get; set; }

    public required string Address { get; set; }
}

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class PostPersona : Persona {
    public required Guid UID { get; set; }
}
