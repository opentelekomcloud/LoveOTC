namespace TSystems.LoveOTC.Hub;

using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

internal partial class ShopHub {
    /**
     * <remarks>
     * @author Aloento
     * @since 0.1.0
     * @version 0.1.0
     * </remarks>
     */
    [Authorize]
    public async Task<bool> UserPostUpdate(PostPersona req) {
        var validCtx = new ValidationContext(req);
        var validRes = new List<ValidationResult>();

        var isValid = Validator.TryValidateObject(req, validCtx, validRes, true);
        if (!isValid) {
            var msg = validRes.Select(x => x.ErrorMessage);
            throw new HubException(string.Join("; ", msg));
        }

        var hasNew = this.Context.Items.TryGetValue("NewUser", out var isNew);
        if (hasNew && isNew is true) {
            var email = this.Context.User!.FindFirstValue(ClaimTypes.Email);

            if (email is null || string.IsNullOrWhiteSpace(email) || !email.Equals(req.EMail, StringComparison.OrdinalIgnoreCase)) {
                this.Context.Abort();
                return false;
            }

            await this.Db.Users.SingleInsertAsync(new() {
                Name = req.Name!,
                EMail = req.EMail!,
                Phone = req.Phone!,
                Address = req.Address!,
            });

            this.Context.Items.Remove("NewUser");
            return true;
        }

        this.Db.Users.Where(x => x.UserId == Guid.Parse(this.Context.UserIdentifier!))

        await this.Db.Users.SingleUpdateAsync(new() {
            UserId = Guid.Parse(this.Context.UserIdentifier!),
            Name = req.Name!,
            EMail = req.EMail!,
            Phone = req.Phone!,
            Address = req.Address!
        });

        throw new HubException();
    }
}
