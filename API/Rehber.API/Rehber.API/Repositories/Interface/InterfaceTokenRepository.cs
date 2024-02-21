using Microsoft.AspNetCore.Identity;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceTokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
