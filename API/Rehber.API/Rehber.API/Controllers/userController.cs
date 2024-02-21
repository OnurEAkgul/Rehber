
using Microsoft.AspNetCore.Authorization;
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

        public userController(UserManager<IdentityUser> userManager, ApplicationDbContext dbContext, InterfaceTokenRepository tokenRepository, InterfaceUserRepository userRepository)
        {
            this.userManager = userManager;
            this.dbContext = dbContext;
            this.tokenRepository = tokenRepository;
            this.userRepository = userRepository;
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

            var existingUser = await userManager.FindByEmailAsync(request.userEmail);
            if (existingUser != null)
            {
                // Handle duplicate email
                ModelState.AddModelError("hata", "Email is already in use");
                return ValidationProblem(ModelState);
            }



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


        // PUT METODU UPDATE https://localhost:7195/api/user/UpdateUser/{userId}
        [HttpPut]
        [Authorize(Roles = "adminRole, userRole")]
        [Route("UpdateUser/{userId:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid userId, UpdateUserRequestDTO request)
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

                    // Check if the user has the "adminRole"
                    bool isAdmin = await userManager.IsInRoleAsync(identityUser, "adminRole");

                    // Allow passwordless update for users with "adminRole"
                    if (!isAdmin || (isAdmin && string.IsNullOrEmpty(request.newPassword)))
                    {
                        // Check if the current password matches
                        if (!await userManager.CheckPasswordAsync(identityUser, request.currentPassword))
                        {
                            // Current password is incorrect
                            return BadRequest("Current password is incorrect");
                        }
                    }

                    // Continue with the rest of your existing logic...
                    identityUser.UserName = request.userName?.Trim();
                    identityUser.Email = request.userEmail?.Trim();

                    // Check if the user wants to change the password
                    if (!string.IsNullOrEmpty(request.newPassword))
                    {
                        // If newPassword is provided, update the password in IdentityUser
                        var newPasswordHash = userManager.PasswordHasher.HashPassword(identityUser, request.newPassword);
                        identityUser.PasswordHash = newPasswordHash;
                    }

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

                    // Check if the user wants to change the password
                    if (!string.IsNullOrEmpty(request.newPassword))
                    {
                        // If newPassword is provided, update the password in userIcerik
                        userIcerik.userPassword = request.newPassword;
                    }

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
        //PUT METODU UPDATE     https://localhost:7195/api/user/UpdateUser/{userId}
        [HttpPut]
        // [Authorize(Roles = "userRole")]
        [Route("UpdateUser/{userId:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid userId, UpdateUserRequestDTO request)
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
        */

        //GET METODU USERID ILE https://localhost:7195/api/user/{userId}
        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("{userId:guid}")]
        public async Task<IActionResult> GetUserByUserId([FromRoute] Guid userId)
        {
            var existingUser = await userManager.FindByIdAsync(userId.ToString());

            if (existingUser == null)
            {
                return NotFound();
            }

            // Retrieve userIcerik
            var userIcerik = await dbContext.userIcerik.FirstOrDefaultAsync(u => u.userId == userId);
            if (userIcerik == null)
            {
                return NotFound("UserIcerik not found");
            }

            var response = new UserDTO
            {
                userId = Guid.Parse(existingUser.Id),
                userName = existingUser.UserName ?? "",
                userEmail = existingUser.Email ?? "",
                userPassword = userIcerik.userPassword,
            };

            return Ok(response);
        }

        [HttpGet("all")]
        [Authorize(Roles = "adminRole")]
        public async Task<IActionResult> getAllUsers()
        {
            var userManagerUsers = await userManager.Users.ToListAsync();
            var userRepoUsers = await userRepository.GetUserAsync();

            if (userManagerUsers == null || userRepoUsers == null)
            {
                return NotFound();
            }
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
        [Authorize(Roles = "userRole")]
        [Route("DeleteUser/{userId:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid userId)
        {
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // Find the IdentityUser
                    var identityUser = await userManager.FindByIdAsync(userId.ToString());
                    if (identityUser == null)
                    {
                        return NotFound("User not found");
                    }

                    // Check if the current user has the permission to delete
                    var userIcerik = await dbContext.userIcerik.FirstOrDefaultAsync(u => u.userId == userId);

                    // Skip ownership check for administrators
                    if (userIcerik.AspNetUserId != identityUser.Id)
                    {
                        return Forbid(); // User is not allowed to delete other users
                    }

                    // Delete IdentityUser (cascade delete will handle related entities)
                    var identityResult = await userManager.DeleteAsync(identityUser);
                    if (!identityResult.Succeeded)
                    {
                        // Handle delete failure
                        throw new Exception("Failed to delete IdentityUser");
                    }

                    // Commit the transaction
                    await transaction.CommitAsync();

                    return Ok(new { Message = "User deleted successfully" });
                }
                catch (Exception)
                {
                    // An error occurred, rollback the transaction
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}

