using Microsoft.EntityFrameworkCore;
using Rehber.API.Models.Domain;

namespace Rehber.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
    
        }
    
        public DbSet<rehberIcerik> rehberIcerikleri { get; set; }
        public DbSet<userIcerik> userIcerikleri { get;set; }
    }
}
