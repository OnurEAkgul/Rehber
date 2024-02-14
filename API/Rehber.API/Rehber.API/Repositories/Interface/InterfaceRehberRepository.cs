using Rehber.API.Models.Domain;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceRehberRepository
    {
        Task<rehberIcerik> CreateAsync(rehberIcerik rehber);

        Task<IEnumerable<rehberIcerik>> GetRehberAsync();
    }
}
