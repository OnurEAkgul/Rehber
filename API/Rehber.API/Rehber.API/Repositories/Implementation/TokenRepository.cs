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

        public TokenRepository(IConfiguration configuration) {
            this.configuration = configuration;
        }



        public string CreateJwtToken(IdentityUser user, List<string> roles)
        {
            //claim oluştur
            var claims = new List<Claim>
            {

                new Claim(ClaimTypes.Email, user.Email)
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            //Jwt token parametrelerini belirle
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            
            var credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims:claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials:credentials
                );

            //tokeni döndür

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
