namespace TSystems.LoveOTC.Hub;

using System.ComponentModel.DataAnnotations;

/**
 * <remarks>
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 * </remarks>
 */
internal class Persona {
    [Required]
    [StringLength(20, MinimumLength = 2)]
    public string? Surname { get; set; }

    [Required]
    [StringLength(20, MinimumLength = 2)]
    public string? Forename { get; set; }

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
