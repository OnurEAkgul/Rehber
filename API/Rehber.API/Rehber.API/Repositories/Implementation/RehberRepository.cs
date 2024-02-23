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

        // REHBER OLUŞTUR
        public async Task<rehberIcerik> CreateAsync(rehberIcerik rehber)
        {
            // Yeni rehber öğesini veritabanına ekleyin
            await dbContext.rehberIcerik.AddAsync(rehber);
            await dbContext.SaveChangesAsync();

            return rehber;
        }

        // ID İLE REHBER VERİSİ SİL
        public async Task<rehberIcerik> DeleteAsync(Guid id)
        {
            // Varolan kişiyi ID'ye göre bulun
            var existingKisi = await dbContext.rehberIcerik.FirstOrDefaultAsync(x => x.id == id);

            if (existingKisi is null)
            {
                return null;
            }

            // Varolan kişiyi silin
            dbContext.rehberIcerik.Remove(existingKisi);
            await dbContext.SaveChangesAsync();

            return existingKisi;
        }

        // TÜM REHBER VERİLERİNİ GETİR
        public async Task<IEnumerable<rehberIcerik>> GetRehberAsync()
        {
            // Tüm rehber verilerini listele
            return await dbContext.rehberIcerik.ToListAsync();
        }

        // WHERE SORGUSU İLE KULLANICININ SAHİP OLDUĞU REHBER VERİLERİNİ GETİR
        public async Task<IEnumerable<rehberIcerik>> GetRehberWhereIdAsync(Guid userId)
        {
            // Kullanıcının sahip olduğu rehber verilerini WHERE sorgusu ile getirin
            return await dbContext.rehberIcerik.Where(x => x.userId == userId).ToListAsync();
        }

        // ID İLE REHBER VERİSİ GETİR
        public async Task<rehberIcerik?> GetRehberById(Guid id)
        {
            // ID'ye göre rehber verisini getirin
            return await dbContext.rehberIcerik.FirstOrDefaultAsync(x => x.id == id);
        }

        // GÜNCELLE
        public async Task<rehberIcerik?> UpdateAsync(rehberIcerik rehber)
        {
            // ID'ye göre varolan kişiyi bulun
            var existingKisi = await dbContext.rehberIcerik.FirstOrDefaultAsync(x => x.id == rehber.id);

            if (existingKisi != null)
            {
                // userId güncellenmemesi için dışarıda bırakın
                rehber.userId = existingKisi.userId;

                // Varolan kişinin değerlerini güncelleyin
                dbContext.Entry(existingKisi).CurrentValues.SetValues(rehber);
                await dbContext.SaveChangesAsync();

                return existingKisi;
            }
            return null;
        }
    }
}
