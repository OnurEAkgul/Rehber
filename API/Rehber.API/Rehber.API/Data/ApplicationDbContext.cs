using Microsoft.EntityFrameworkCore;
using Rehber.API.Models.Domain;

namespace Rehber.API.Data
{
    // Uygulamanın veritabanı bağlamını temsil eden sınıf
    public class ApplicationDbContext : DbContext
    {
        // DbContextOptions'ı alarak temel sınıfın kurucu metodunu çağır
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        // rehberIcerik tablosunu temsil eden DbSet
        public DbSet<rehberIcerik> rehberIcerik { get; set; }

        // userIcerik tablosunu temsil eden DbSet
        public DbSet<userIcerik> userIcerik { get; set; }
    }
}
