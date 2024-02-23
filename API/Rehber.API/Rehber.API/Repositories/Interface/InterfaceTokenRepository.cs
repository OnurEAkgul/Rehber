using Microsoft.AspNetCore.Identity;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceTokenRepository
    {
        // Verilen IdentityUser ve rol listesi ile JWT token oluşturur.
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
