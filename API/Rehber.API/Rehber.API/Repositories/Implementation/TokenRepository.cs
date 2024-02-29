using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Rehber.API.Repositories.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

namespace Rehber.API.Repositories.Implementation
{
    public class TokenRepository : InterfaceTokenRepository
    {
        private readonly IConfiguration configuration;

        public TokenRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string CreateJwtToken(IdentityUser user, List<string> roles)
        {
            // Token için talepleri oluştur
            var claims = new List<Claim>
            {
                // Kullanıcının e-posta bilgisini içeren bir talep oluştur
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Rolleri içeren talepleri ekleyin
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            // JWT token için anahtar ve kimlik doğrulama belirle
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // JWT token parametrelerini belirle
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            // Tokeni string olarak döndür
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
