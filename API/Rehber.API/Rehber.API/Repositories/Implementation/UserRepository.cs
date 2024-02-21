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

        public async Task<IEnumerable<userIcerik>> GetUserAsync()
        {
            return await dbContext.userIcerik.ToListAsync();
        }


        ////USER OLUŞTUR
        //public async Task<userIcerik> CreateAsync(userIcerik userIcerik)
        //{
        //    await dbContext.userIcerik.AddAsync(userIcerik);
        //    await dbContext.SaveChangesAsync();

        //    return userIcerik;
        //}

        //İD İLE USER VERİSİ SİL
        //public async Task<userIcerik?> DeleteAsync(Guid id)
        //{
        //    var existingKisi = await dbContext.userIcerik.FirstOrDefaultAsync(x => x.userId == id);

        //    if (existingKisi is null)
        //    {
        //        return null;
        //    }

        //    dbContext.userIcerik.Remove(existingKisi);
        //    await dbContext.SaveChangesAsync();
        //    return existingKisi;
        //}

        //TÜM USER VERİLERİNİ GETİR
        //public async Task<IEnumerable<userIcerik>> GetUserAsync()
        //{
        //    return await dbContext.userIcerik.ToListAsync();
        //}

        ////ID İLE USER VERİSİ GETİR
        //public async Task<userIcerik?> GetUserByUserId(Guid userId)
        //{
        //    return await dbContext.userIcerik.FirstOrDefaultAsync(x => x.AspNetUserId == userId.ToString().ToUpper());
        //}

        //GÜNCELLE
        //public async Task<userIcerik?> UpdateAsync(userIcerik userIcerik)
        //{
        //    var existingKisi = await dbContext.userIcerik.FirstOrDefaultAsync(x => x.userId == userIcerik.userId);

        //    if (existingKisi != null)
        //    {
        //        dbContext.Entry(existingKisi).CurrentValues.SetValues(userIcerik);
        //        await dbContext.SaveChangesAsync();
        //        return existingKisi;
        //    }
        //    return null;
        //}
    }
}
