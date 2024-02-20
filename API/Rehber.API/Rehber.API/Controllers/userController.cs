using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rehber.API.Data;
using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;
using Rehber.API.Repositories.Implementation;
using Rehber.API.Repositories.Interface;

namespace Rehber.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {

        private readonly InterfaceUserRepository userRepository;
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext dbContext;
        private readonly InterfaceTokenRepository tokenRepository;

        public userController(UserManager<IdentityUser> userManager, ApplicationDbContext dbContext, InterfaceTokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.dbContext = dbContext;
            this.tokenRepository = tokenRepository;
        }


        //POST METODU LOGIN     https://localhost:7195/api/user/Login

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var identityUser = await userManager.FindByEmailAsync(request.userEmail);

            if (identityUser == null)
            {
                return NotFound();
            }

            if (identityUser is not null)
            {


                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.userPassword);

                if (checkPasswordResult)
                {

                    var role = await userManager.GetRolesAsync(identityUser);
                    //Create a token if successful               
                    var jwttoken = tokenRepository.CreateJwtToken(identityUser, role.ToList());
                    var response = new LoginResponseDTO()
                    {
                        userEmail = request.userEmail,
                        token = jwttoken,
                        role = role.ToList(),
                        userId = Guid.Parse(identityUser.Id)
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "hatalı şifre girdiniz");
            return ValidationProblem(ModelState);
        }


        //POST METODU SIGN UP   https://localhost:7195/api/user/CreateUser
        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] signUpRequestDTO request)
        {
            var identityUser = new IdentityUser
            {
                UserName = request.userName?.Trim(),
                Email = request.userEmail?.Trim()
            };

            var identityResult = await userManager.CreateAsync(identityUser, request.userPassword);

            if (identityResult.Succeeded)
            {
                await userManager.AddToRoleAsync(identityUser, "userRole");

                var userIcerik = new userIcerik
                {
                    userId = Guid.Parse(identityUser.Id),
                    userName = request.userName?.Trim(),
                    userEmail = request.userEmail?.Trim(),
                    userPassword = request.userPassword?.Trim(), // Include the password
                    AspNetUserId = identityUser.Id
                };

                dbContext.userIcerik.Add(userIcerik);
                await dbContext.SaveChangesAsync();

                return Ok(request);
            }
            else
            {
                foreach (var error in identityResult.Errors)
                {
                    ModelState.AddModelError("hata", error.Description);
                }

                return ValidationProblem(ModelState);
            }
        }
        [HttpPut]
        [Route("UpdateUser/{userId:guid}")]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserRequestDTO request)
        {
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // Update IdentityUser
                    var identityUser = await userManager.FindByIdAsync(userId.ToString());
                    if (identityUser == null)
                    {
                        return NotFound("User not found");
                    }

                    identityUser.UserName = request.userName?.Trim();
                    identityUser.Email = request.userEmail?.Trim();

                    var identityResult = await userManager.UpdateAsync(identityUser);
                    if (!identityResult.Succeeded)
                    {
                        // Handle update failure
                        throw new Exception("Failed to update IdentityUser");
                    }

                    // Update userIcerik
                    var userIcerik = await dbContext.userIcerik.FirstOrDefaultAsync(u => u.userId == userId);
                    if (userIcerik == null)
                    {
                        return NotFound("UserIcerik not found");
                    }

                    userIcerik.userName = request.userName?.Trim();
                    userIcerik.userEmail = request.userEmail?.Trim();
                    // Update other properties as needed

                    await dbContext.SaveChangesAsync();

                    // Commit the transaction
                    await transaction.CommitAsync();

                    return Ok(request);
                }
                catch (Exception)
                {
                    // An error occurred, rollback the transaction
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        /*

        //POST METHODU https://localhost:7195/api/user
        [HttpPost]

        public async Task<IActionResult> CreateUser([FromBody] signUpRequestDTO request)
        {


            //dtodan domain dönüşümü
            var userIcerik = new userIcerik
            {
                userName = request.userName?.Trim(),
                userEmail = request.userEmail?.Trim(),
                userPassword = request.userPassword?.Trim()
            };


            await userRepository.CreateAsync(userIcerik);

            //domainden dtoya dönüşüm

            var response = new UserDTO
            {
                userId = userIcerik.userId,
                userName = userIcerik.userName?.Trim(),
                userEmail = userIcerik.userEmail?.Trim(),
                userPassword = userIcerik.userPassword?.Trim()
            };
            return Ok(response);
        }

        //GET METHODU https://localhost:7195/api/user
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var user = await userRepository.GetUserAsync();

            //Map domain modelden DTO ya

            var response = new List<UserDTO>();

            //veri tabanında var olan veri boyunca 
            foreach (var item in user)
            {

                response.Add(new UserDTO
                {
                    userId = item.userId,
                    userName = item.userName,
                    userPassword= item.userPassword,
                    userEmail = item.userEmail
                }
                );
            }

            return Ok(response);
        }


        //IDLİ GET METHODU https://localhost:7195/api/user/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUserById([FromRoute] Guid id)
        {
            var existingRehber = await userRepository.GetUserById(id);

            if (existingRehber == null)
            {
                return NotFound();
            }

            var response = new UserDTO
            {

                userId = existingRehber.userId,
                userName = existingRehber.userName,
                userPassword = existingRehber.userPassword,
                userEmail = existingRehber.userEmail
            };


            return Ok(response);

        }



        //IDLİ DELETE METHODU https://localhost:7195/api/Rehber/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteRehber([FromRoute] Guid id)
        {
            var user = await userRepository.DeleteAsync(id);

            if (user is null)
            {
                return NotFound();
            }
            var response = new UserDTO
            {
                userId = id,
                userName = user.userName,
                userPassword = user.userPassword,
                userEmail = user.userEmail,
            };

            return Ok(response);
        }
    */
    }
}

