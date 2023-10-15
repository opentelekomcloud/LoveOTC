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
internal class User {
    public Guid UserId { get; set; }

    public string Name { get; set; }

    [EmailAddress]
    public string EMail { get; set; }

    [Phone]
    public string Phone { get; set; }

    public string Address { get; set; }

    public bool? Admin { get; set; }
}
