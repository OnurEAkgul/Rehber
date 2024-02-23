using Microsoft.EntityFrameworkCore;
using Rehber.API.Data;
using Rehber.API.Models.Domain;
using Rehber.API.Repositories.Interface;

namespace Rehber.API.Repositories.Implementation
{
    public class UserRepository : InterfaceUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //TÜM KULLANICI BİLGİLERİNİ GETİRME
        public async Task<IEnumerable<userIcerik>> GetUserAsync()
        {
            return await dbContext.userIcerik.ToListAsync();
        }
    }
}
