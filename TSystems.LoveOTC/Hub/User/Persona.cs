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
    [StringLength(50, MinimumLength = 2)]
    public string? Name { get; set; }

    [Required]
    [Phone]
    [StringLength(15, MinimumLength = 7)]
    public string? Phone { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(100, MinimumLength = 6)]
    public string? EMail { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 20)]
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
