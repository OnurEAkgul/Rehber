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

        public async Task<rehberIcerik> DeleteAsync(Guid id)
        {
            var existingKisi = await dbContext.rehberIcerikleri.FirstOrDefaultAsync(x=>x.id==id);
        
            if (existingKisi is null)
            {
                return null;
            }

            dbContext.rehberIcerikleri.Remove(existingKisi);
            await dbContext.SaveChangesAsync();
            return existingKisi;
        }

        public async Task<IEnumerable<rehberIcerik>> GetRehberAsync()
        {
            return await dbContext.rehberIcerikleri.ToListAsync();
        }

        public async Task<rehberIcerik?> GetRehberById(Guid id)
        {
            return await dbContext.rehberIcerikleri.FirstOrDefaultAsync(x => x.id == id);    
        }

        public async Task<rehberIcerik?> UpdateAsync(rehberIcerik rehber)
        {
         var existingKisi = await dbContext.rehberIcerikleri.FirstOrDefaultAsync(x=>x.id == rehber.id);

            if (existingKisi != null) { 
            
                dbContext.Entry(existingKisi).CurrentValues.SetValues(rehber);
                await dbContext.SaveChangesAsync();
                return existingKisi;
            }
            return null;
        }
    }
}
