using Microsoft.EntityFrameworkCore;
using Rehber.API.Models.Domain;

namespace Rehber.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
    
        }
    
        public DbSet<rehberIcerik> rehberIcerik { get; set; }
        public DbSet<userIcerik> userIcerik { get;set; }
    }
}
