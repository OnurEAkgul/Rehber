using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rehber.API.Data;
using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;
using Rehber.API.Repositories.Implementation;
using Rehber.API.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rehber.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly InterfaceUserRepository userRepository;
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext dbContext;
        private readonly InterfaceTokenRepository tokenRepository;

        public UserController(UserManager<IdentityUser> userManager, ApplicationDbContext dbContext, InterfaceTokenRepository tokenRepository, InterfaceUserRepository userRepository)
        {
            this.userManager = userManager;
            this.dbContext = dbContext;
            this.tokenRepository = tokenRepository;
            this.userRepository = userRepository;
        }

        // POST METODU LOGIN https://localhost:7195/api/user/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            // İstek geçerli değilse BadRequest döndür
            if (request == null)
            {
                return BadRequest("Geçersiz istek");
            }

            // Kullanıcının e-posta adresine göre IdentityUser'ı bul
            var identityUser = await userManager.FindByEmailAsync(request.userEmail);

            // Kullanıcı bulunamazsa NotFound döndür
            if (identityUser == null)
            {
                return NotFound();
            }

            if (identityUser is not null)
            {
                // Şifreyi kontrol et
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.userPassword);

                if (checkPasswordResult)
                {
                    // Rol bilgilerini al
                    var role = await userManager.GetRolesAsync(identityUser);

                    // Jwt token oluştur
                    var jwttoken = tokenRepository.CreateJwtToken(identityUser, role.ToList());

                    // Yanıt oluştur
                    var response = new LoginResponseDTO()
                    {
                        userEmail = request.userEmail,
                        userName = identityUser.UserName,
                        token = jwttoken,
                        role = role.ToList(),
                        userId = Guid.Parse(identityUser.Id)
                    };

                    return Ok(response);
                }
            }

            ModelState.AddModelError("", "Hatalı şifre girdiniz");
            return ValidationProblem(ModelState);
        }

        // POST METODU SIGN UP https://localhost:7195/api/user/CreateUser
        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] signUpRequestDTO request)
        {
            // İstek geçerli değilse BadRequest döndür
            if (request == null)
            {
                return BadRequest("Geçersiz istek");
            }

            // Yeni bir IdentityUser oluştur
            var identityUser = new IdentityUser
            {
                UserName = request.userName?.Trim(),
                Email = request.userEmail?.Trim()
            };

            // E-posta ve şifre kontrolü
            if (string.IsNullOrEmpty(request.userEmail) || string.IsNullOrEmpty(request.userPassword))
            {
                ModelState.AddModelError("hata", "E-posta ve şifre gerekli");
                return ValidationProblem(ModelState);
            }

            // E-posta adresi zaten kullanılmış mı kontrol et
            var existingUser = await userManager.FindByEmailAsync(request.userEmail);
            if (existingUser != null)
            {
                ModelState.AddModelError("hata", "E-posta zaten kullanılıyor");
                return ValidationProblem(ModelState);
            }

            // IdentityUser oluştur
            var identityResult = await userManager.CreateAsync(identityUser, request.userPassword);

            // Başarılı ise
            if (identityResult.Succeeded)
            {
                // Kullanıcıya userRole rolü ver
                await userManager.AddToRoleAsync(identityUser, "userRole");

                // userIcerik oluştur
                var userIcerik = new userIcerik
                {
                    userId = Guid.Parse(identityUser.Id),
                    userName = request.userName?.Trim(),
                    userEmail = request.userEmail?.Trim(),
                    userPassword = request.userPassword?.Trim(), // Şifreyi içerir
                    AspNetUserId = identityUser.Id
                };

                // Veritabanına ekle ve kaydet
                dbContext.userIcerik.Add(userIcerik);
                await dbContext.SaveChangesAsync();

                return Ok(request);
            }
            else
            {
                // Hata durumunda
                foreach (var error in identityResult.Errors)
                {
                    ModelState.AddModelError("hata", error.Description);
                }

                return ValidationProblem(ModelState);
            }
        }

        // PUT METODU UPDATE https://localhost:7195/api/user/UpdateUser/{userId}
        [HttpPut]
        //[Authorize(Roles = "adminRole, userRole")]
        [Route("UpdateUser/{userId:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid userId, UpdateUserRequestDTO request)
        {
            // İstek geçerli değilse BadRequest döndür
            if (request == null)
            {
                return BadRequest("Geçersiz istek");
            }

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // IdentityUser'ı bul
                    var identityUser = await userManager.FindByIdAsync(userId.ToString());
                    if (identityUser == null)
                    {
                        return NotFound("Kullanıcı bulunamadı");
                    }

                    // Admin mi kontrolü
                    bool isAdmin = await userManager.IsInRoleAsync(identityUser, "adminRole");

                    // Admin değilse veya (admin ise ve yeni şifre yoksa) şifre kontrolü yap
                    if (!isAdmin || (isAdmin && string.IsNullOrEmpty(request.newPassword)))
                    {
                        if (!await userManager.CheckPasswordAsync(identityUser, request.currentPassword))
                        {
                            return BadRequest("Geçerli şifre yanlış");
                        }
                    }

                    // Kullanıcı bilgilerini güncelle
                    identityUser.UserName = request.userName?.Trim();
                    identityUser.Email = request.userEmail?.Trim();

                    // Yeni şifre varsa hash'le
                    if (!string.IsNullOrEmpty(request.newPassword))
                    {
                        var newPasswordHash = userManager.PasswordHasher.HashPassword(identityUser, request.newPassword);
                        identityUser.PasswordHash = newPasswordHash;
                    }

                    // IdentityUser güncelle
                    var identityResult = await userManager.UpdateAsync(identityUser);
                    if (!identityResult.Succeeded)
                    {
                        throw new Exception("IdentityUser güncellenirken hata oluştu");
                    }

                    // userIcerik'i bul
                    var userIcerik = await dbContext.userIcerik.FirstOrDefaultAsync(u => u.userId == userId);
                    if (userIcerik == null)
                    {
                        return NotFound("userIcerik bulunamadı");
                    }

                    // Kullanıcı bilgilerini güncelle
                    userIcerik.userName = request.userName?.Trim();
                    userIcerik.userEmail = request.userEmail?.Trim();

                    // Yeni şifre varsa güncelle
                    if (!string.IsNullOrEmpty(request.newPassword))
                    {
                        userIcerik.userPassword = request.newPassword;
                    }

                    // Veritabanına kaydet
                    await dbContext.SaveChangesAsync();

                    // İşlemi başarılı bir şekilde tamamla
                    await transaction.CommitAsync();

                    return Ok(request);
                }
                catch (Exception)
                {
                    // Hata olursa işlemi geri al
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        //GET METODU USERID ILE https://localhost:7195/api/user/{userId}
        [HttpGet]
       // [Authorize(Roles = "userRole")]
        [Route("{userId:guid}")]
        public async Task<IActionResult> GetUserByUserId([FromRoute] Guid userId)
        {
            // IdentityUser'ı bul
            var existingUser = await userManager.FindByIdAsync(userId.ToString());

            // Kullanıcı bulunamazsa NotFound döndür
            if (existingUser == null)
            {
                return NotFound();
            }

            // userIcerik'i bul
            var userIcerik = await dbContext.userIcerik.FirstOrDefaultAsync(u => u.userId == userId);
            if (userIcerik == null)
            {
                return NotFound("userIcerik bulunamadı");
            }

            // Yanıt oluştur
            var response = new UserDTO
            {
                userId = Guid.Parse(existingUser.Id),
                userName = existingUser.UserName ?? "",
                userEmail = existingUser.Email ?? "",
                userPassword = userIcerik.userPassword,
            };

            return Ok(response);
        }

        // Tüm kullanıcıları getir
        [HttpGet("all")]
       // [Authorize(Roles = "adminRole")]
        public async Task<IActionResult> getAllUsers()
        {
            // UserManager ve UserRepository'den kullanıcıları getir
            var userManagerUsers = await userManager.Users.ToListAsync();
            var userRepoUsers = await userRepository.GetUserAsync();

            // Kullanıcılar bulunamazsa NotFound döndür
            if (userManagerUsers == null || userRepoUsers == null)
            {
                return NotFound();
            }

            // Yanıt oluştur
            var response = new List<UserDTO>();
            foreach (var item in userRepoUsers)
            {
                response.Add(new UserDTO
                {
                    userId = item.userId,
                    userName = item.userName,
                    userEmail = item.userEmail,
                    userPassword = item.userPassword,
                });
            }

            return Ok(response);
        }

        // DELETE METODU https://localhost:7195/api/user/DeleteUser/{userId}
        [HttpDelete]
       // [Authorize(Roles = "userRole")]
        [Route("DeleteUser/{userId:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid userId)
        {
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // IdentityUser'ı bul
                    var identityUser = await userManager.FindByIdAsync(userId.ToString());
                    if (identityUser == null)
                    {
                        return NotFound("Kullanıcı bulunamadı");
                    }

                    // Kullanıcının silme izni var mı kontrol et
                    var userIcerik = await dbContext.userIcerik.FirstOrDefaultAsync(u => u.userId == userId);

                    // Yönetici ise sahiplik kontrolünü atla
                    if (userIcerik.AspNetUserId != identityUser.Id)
                    {
                        return Forbid(); // Kullanıcı başka kullanıcıları silemez
                    }

                    // IdentityUser'ı sil (ilişkili varlıklar cascade delete ile silinecek)
                    var identityResult = await userManager.DeleteAsync(identityUser);
                    if (!identityResult.Succeeded)
                    {
                        // Silme başarısız olursa
                        throw new Exception("IdentityUser silinemedi");
                    }

                    // İşlemi tamamla
                    await transaction.CommitAsync();

                    return Ok(new { Message = "Kullanıcı başarıyla silindi" });
                }
                catch (Exception)
                {
                    // Hata olursa işlemi geri al
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
