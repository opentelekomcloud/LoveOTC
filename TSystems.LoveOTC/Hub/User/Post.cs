namespace TSystems.LoveOTC.Hub;

using System.ComponentModel.DataAnnotations;
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
            throw new HubException(string.Join(", ", msg));
        }

        throw new NotImplementedException();
    }
}
