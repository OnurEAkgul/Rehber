using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rehber.API.Models.Domain;
using System.Collections.Generic;

namespace Rehber.API.Data
{
    public class AuthenticationDbContext : IdentityDbContext
    {
        public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : base(options)
        {
        }

        public DbSet<userIcerik> userIcerik { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Explicitly configure the relationship between IdentityUser and userIcerik
            builder.Entity<userIcerik>()
                .HasOne(u => u.AspNetUser)
                .WithOne()
                .HasForeignKey<userIcerik>(ui => ui.AspNetUserId)
                .IsRequired(false);

            // user role oluştur
            var userRoleId = "afc66ff4-b07e-46e1-b388-e8fdcf1067d4";
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

            // seed roles first
            builder.Entity<IdentityRole>().HasData(roles);

            // admin rol oluştur
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

            // seed admin user
            builder.Entity<IdentityUser>().HasData(admin);

            // admin role ver
            var adminRol = new List<IdentityUserRole<string>>
            {
                new ()
                {
                    UserId = adminRoleId,
                    RoleId = userRoleId // Assign the user role to the admin user
                },
                new ()
                {
                    UserId = adminRoleId,
                    RoleId = adminReadId // Assign the admin role to the admin user
                }

            };

            // seed user roles
            builder.Entity<IdentityUserRole<string>>().HasData(adminRol);
        }
    }
}

/*using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rehber.API.Models.Domain;

namespace Rehber.API.Data
{
    public class AuthenticationDbContext : IdentityDbContext
    {
        public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : base(options)
        {
        }

        public DbSet<userIcerik> userIcerik { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Explicitly configure the relationship between IdentityUser and userIcerik
            builder.Entity<userIcerik>()
                 .HasOne(u => u.AspNetUser)
                 .WithOne()
                 .HasForeignKey<userIcerik>(ui => ui.AspNetUserId)
                 .IsRequired(false);



            //user rol oluştur
            var userRoleId = "afc66ff4-b07e-46e1-b388-e8fdcf1067d4";

            var role = new List<IdentityRole>
            {
                new IdentityRole(){
                Id = userRoleId,
                Name = "userRole",
                NormalizedName = "userRole".ToUpper(),
                ConcurrencyStamp =userRoleId
                }

            };

            //seedle
            builder.Entity<IdentityRole>().HasData(role);

            //admin rol oluştur

            var adminRoleId = "4795ef64-44c4-434e-8f6a-3d614bb9373a";

            var admin = new IdentityUser()
            {
                Id = adminRoleId,
                UserName = "admin@rehber.com",
                Email = "admin@rehber.com",
                NormalizedUserName = "admin@rehber.com".ToUpper(),
                NormalizedEmail = "admin@rehber.com".ToUpper()

            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin,"admin123");


            builder.Entity<IdentityUser>().HasData(admin);
            //admine rol ver

            var adminRol = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminRoleId,
                    RoleId = adminRoleId,
                },
                new() {
                
                    UserId = userRoleId,
                    RoleId = userRoleId,

                }

            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRol);

        }
    }
    
}

*/

