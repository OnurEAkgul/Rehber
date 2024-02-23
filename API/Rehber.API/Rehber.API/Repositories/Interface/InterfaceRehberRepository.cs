using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceRehberRepository
    {

        //REHBER KAYDI OLUŞTURMA
        Task<rehberIcerik> CreateAsync(rehberIcerik rehber);

        //TÜM REHBER İÇERİĞİNİ GETİRME
        Task<IEnumerable<rehberIcerik>> GetRehberAsync();
        
        //USERID İLE REHBER BİLGİSİ GETİRME
        Task<IEnumerable<rehberIcerik>> GetRehberWhereIdAsync(Guid userId);
        
        //ID İLE REHBER BİLGİSİ GETİRME
        Task<rehberIcerik?> GetRehberById(Guid id);

        //REHBER İÇERİĞİ GÜNCELLEME
        Task<rehberIcerik?> UpdateAsync(rehberIcerik rehber);

        //İD YE GÖRE REHBERİ SİLME
        Task<rehberIcerik?>  DeleteAsync(Guid id);
    }
}
