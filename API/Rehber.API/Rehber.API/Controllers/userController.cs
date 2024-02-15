using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;
using Rehber.API.Repositories.Interface;

namespace Rehber.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {

        private readonly InterfaceUserRepository userRepository;

        public userController(InterfaceUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }


        //POST 
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] signUpRequestDTO request)
        {
            //dtodan domain dönüşümü
            var userIcerik = new userIcerik
            {
                userName = request.userName,
                userEmail = request.userEmail,
                userPassword = request.userPassword
            };

            await userRepository.CreateAsync(userIcerik);

            //domainden dtoya dönüşüm

            var response = new UserDTO
            {
                userId = userIcerik.userId,
                userName = userIcerik.userName,
                userEmail = userIcerik.userEmail,
                userPassword = userIcerik.userPassword
            };
            return Ok(response);
        }
    }
}
