using Rehber.API.Models.Domain;

namespace Rehber.API.Repositories.Interface
{
    public interface InterfaceUserRepository
    {

        //TÜM KULLANICI BİLGİLERİNİ GETİRME
        Task<IEnumerable<userIcerik>> GetUserAsync();


    }
}
