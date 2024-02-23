using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rehber.API.Models.Domain;
using System.Collections.Generic;

namespace Rehber.API.Data
{
    // Kimlik doğrulama veritabanı bağlamını temsil eden sınıf.
    public class AuthenticationDbContext : IdentityDbContext
    {
        public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : base(options)
        {
        }

        // Kullanıcı içeriği tablosu
        public DbSet<userIcerik> userIcerik { get; set; }

        // Veritabanı modeli oluşturulurken yapılacak özel konfigürasyonları içeren metot.
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // IdentityUser ve userIcerik arasındaki ilişkiyi açıkça yapılandır
            builder.Entity<userIcerik>()
                .HasOne(u => u.AspNetUser)
                .WithOne()
                .HasForeignKey<userIcerik>(ui => ui.AspNetUserId)
                .IsRequired(false);

            // Kullanıcı rolünü oluştur
            var userRoleId = "afc66ff4-b07e-46e1-b388-e8fdcf1067d4";
            // Admin Okuma rolünü oluştur
            var adminReadId = "2b62112c-3386-45e1-9dee-5beeaf31b9eb";


            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = userRoleId,
                    Name = "userRole",
                    NormalizedName = "userRole".ToUpper(),
                    ConcurrencyStamp = userRoleId
                },
                new IdentityRole()
                {
                    Id = adminReadId,
                    Name = "adminRole",
                    NormalizedName = "adminRole".ToUpper(),
                    ConcurrencyStamp = adminReadId
                }
            };

            // Rol bilgilerini ekleyin
            builder.Entity<IdentityRole>().HasData(roles);

            // Admin rolünü oluştur
            var adminRoleId = "4795ef64-44c4-434e-8f6a-3d614bb9373a";

            var admin = new IdentityUser
            {
                Id = adminRoleId,
                UserName = "admin@rehber.com",
                Email = "admin@rehber.com",
                NormalizedUserName = "admin@rehber.com".ToUpper(),
                NormalizedEmail = "admin@rehber.com".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "admin123");

            // Admin kullanıcısını ekle
            builder.Entity<IdentityUser>().HasData(admin);

            // Admin kullanıcısına rol ata
            var adminRoles = new List<IdentityUserRole<string>>
            {
                new ()
                {
                    UserId = adminRoleId,
                    RoleId = userRoleId // Admin kullanıcısına kullanıcı rolünü ata
                },
                new ()
                {
                    UserId = adminRoleId,
                    RoleId = adminRoleId // Admin kullanıcısına admin rolünü ata
                }
            };

            // Kullanıcı rollerini ekle
            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}
