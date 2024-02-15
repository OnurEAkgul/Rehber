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
        public async Task<userIcerik> CreateAsync(userIcerik userIcerik)
        {
            await dbContext.userIcerikleri.AddAsync(userIcerik);
            await dbContext.SaveChangesAsync();

            return userIcerik;
        }
    }
}
