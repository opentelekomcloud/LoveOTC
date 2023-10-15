namespace TSystems.LoveOTC.Hub;

using System.ComponentModel.DataAnnotations;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class Persona {
    [Required]
    public string? Name { get; set; }

    [Required]
    [Phone]
    public string? Phone { get; set; }

    [Required]
    [EmailAddress]
    public string? EMail { get; set; }

    [Required]
    public string? Address { get; set; }
}

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 * </remarks>
 */
internal class PostPersona : Persona {
    [Required]
    public Guid? UId { get; set; }
}
