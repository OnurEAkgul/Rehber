using Microsoft.EntityFrameworkCore;
using Rehber.API.Data;
using Rehber.API.Models.Domain;
using Rehber.API.Repositories.Interface;

namespace Rehber.API.Repositories.Implementation
{
    public class RehberRepository : InterfaceRehberRepository
    {
        private readonly ApplicationDbContext dbContext;

        public RehberRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<rehberIcerik> CreateAsync(rehberIcerik rehber)
        {

            await dbContext.rehberIcerikleri.AddAsync(rehber);
            await dbContext.SaveChangesAsync();

            return rehber;

        }

        public async Task<IEnumerable<rehberIcerik>> GetRehberAsync()
        {
            return await dbContext.rehberIcerikleri.ToListAsync();
        }
    }
}
