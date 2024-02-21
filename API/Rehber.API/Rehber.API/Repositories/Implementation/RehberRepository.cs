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
        
        //REHBER OLUŞTUR
        public async Task<rehberIcerik> CreateAsync(rehberIcerik rehber)
        {

            await dbContext.rehberIcerik.AddAsync(rehber);
            await dbContext.SaveChangesAsync();

            return rehber;

        }
        
        //İD İLE REHBER VERİSİ SİL
        public async Task<rehberIcerik> DeleteAsync(Guid id)
        {
            var existingKisi = await dbContext.rehberIcerik.FirstOrDefaultAsync(x=>x.id==id);
        
            if (existingKisi is null)
            {
                return null;
            }

            dbContext.rehberIcerik.Remove(existingKisi);
            await dbContext.SaveChangesAsync();
            return existingKisi;
        }
        
        //TÜM REHBER VERİLERİNİ GETİR
        public async Task<IEnumerable<rehberIcerik>> GetRehberAsync()
        {
            return await dbContext.rehberIcerik.ToListAsync();
        }
        
        // WHERE SORGUSU İLE KULLANICININ SAHİP
        public async Task<IEnumerable<rehberIcerik>> GetRehberWhereIdAsync(Guid userId)
        {
            return await dbContext.rehberIcerik.Where(x => x.userId == userId).ToListAsync();
        }
        

        //ID İLE REHBER VERİSİ GETİR
        public async Task<rehberIcerik?> GetRehberById(Guid id)
        {
            return await dbContext.rehberIcerik.FirstOrDefaultAsync(x => x.id == id);    
        }
        
        //GÜNCELLE
        public async Task<rehberIcerik?> UpdateAsync(rehberIcerik rehber)
        {
         var existingKisi = await dbContext.rehberIcerik.FirstOrDefaultAsync(x=>x.id == rehber.id);

            if (existingKisi != null) {
                // Exclude userId from being updated
                rehber.userId = existingKisi.userId;

                dbContext.Entry(existingKisi).CurrentValues.SetValues(rehber);
                await dbContext.SaveChangesAsync();

                return existingKisi;
            }
            return null;
        }
    }
}
