using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceRehberRepository
    {
        Task<rehberIcerik> CreateAsync(rehberIcerik rehber);

        Task<IEnumerable<rehberIcerik>> GetRehberAsync();
        
        // BURASI DAHA SONRA KULLANICININ VERİSİ ALINARAK REHBER GÖSTERMEK İÇİN KULLANILACAK
        Task<IEnumerable<rehberIcerik>> GetRehberWhereIdAsync(Guid userId);
        
        Task<rehberIcerik?> GetRehberById(Guid id);

        Task<rehberIcerik?> UpdateAsync(rehberIcerik rehber);

        Task<rehberIcerik?>  DeleteAsync(Guid id);
    }
}
