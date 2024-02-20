using Rehber.API.Models.Domain;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceUserRepository
    {
        Task<userIcerik> CreateAsync(userIcerik userIcerik);

        Task<IEnumerable<userIcerik>> GetUserAsync();

        Task<userIcerik?> GetUserById(Guid id);

        Task<userIcerik?> UpdateAsync(userIcerik userIcerik);

        Task<userIcerik?> DeleteAsync(Guid id);
    }
}
