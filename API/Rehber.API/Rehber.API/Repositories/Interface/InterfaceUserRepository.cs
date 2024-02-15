using Rehber.API.Models.Domain;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceUserRepository
    {
        Task<userIcerik> CreateAsync(userIcerik userIcerik);
    }
}
