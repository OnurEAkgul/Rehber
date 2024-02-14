using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceRehberRepository
    {
        Task<rehberIcerik> CreateAsync(rehberIcerik rehber);

        Task<IEnumerable<rehberIcerik>> GetRehberAsync();

        Task<rehberIcerik?> GetRehberById(Guid id);

        Task<rehberIcerik?> UpdateAsync(rehberIcerik rehber);

        Task<rehberIcerik?>  DeleteAsync(Guid id);
    }
}
