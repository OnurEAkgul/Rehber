using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rehber.API.Data;
using Rehber.API.Models.Domain;
using Rehber.API.Models.DTO;
using Rehber.API.Repositories.Implementation;
using Rehber.API.Repositories.Interface;

namespace Rehber.API.Controllers
{

    //controller bizim REST metotlarını oluşturup kullandığımız kısım
    // https://localhost:xxxx/api/Rehber
    [Route("api/[controller]")]
    [ApiController]
    public class RehberController : ControllerBase
    {
        private readonly InterfaceRehberRepository rehberRepository;

        public RehberController(InterfaceRehberRepository rehberRepository)
        {
            this.rehberRepository = rehberRepository;
        }

        //POST METHODU https://localhost:7195/api/Rehber

        [HttpPost("{userId:guid}")]
        // [Route("{userId:guid}")]
         [Authorize(Roles = "userRole")]
        public async Task<IActionResult> CreateRehber([FromBody] CreateRehberRequest request, [FromRoute] Guid userId)
        {
            // DTO dan domain modeline
            var rehber = new rehberIcerik
            {
                name = request.name,
                surname = request.surname,
                email = request.email,
                phone = request.phone,
                userId = userId // Use userId from the route
            };

            await rehberRepository.CreateAsync(rehber);

            // Domain modelinden DTO ya
            var response = new RehberDTO
            {
                id = rehber.id,
                name = rehber.name,
                surname = rehber.surname,
                email = rehber.email,
                phone = rehber.phone,
                userId = userId // Use userId from the route
            };

            return Ok(response);
        }

        //GET METHODU https://localhost:7195/api/Rehber
        [HttpGet("{userId:guid}")]
        //[Route("{userId:guid}")]
        [Authorize(Roles = "userRole")]
        public async Task<IActionResult> GetRehberWhereId([FromRoute] Guid userId)
        {
            var rehber = await rehberRepository.GetRehberWhereIdAsync(userId);

            // Map domain model to DTO
            var response = rehber.Select(item => new RehberDTO
            {
                id = item.id,
                name = item.name,
                surname = item.surname,
                email = item.email,
                phone = item.phone,
                userId = item.userId
            }).ToList();

            return Ok(response);
        }

        //GET METHODU TÜM HEPSİNİ GETİRİYOR https://localhost:7195/api/Rehber/all
        [HttpGet ("all")]
        [Authorize(Roles = "adminRole")]
        public async Task<IActionResult> GetRehber()
        {
            var rehber = await rehberRepository.GetRehberAsync();

            //Map domain modelden DTO ya

            var response = new List<RehberDTO>();

            //veri tabanında var olan veri boyunca 
            foreach (var item in rehber)
            {

                response.Add(new RehberDTO {
                    id = item.id,
                    name = item.name,
                    surname = item.surname,
                    email = item.email,
                    phone = item.phone,
                    userId = item.userId
                }
                );
            }

            return Ok(response);
        }
        

        //IDLİ GET METHODU IDYE GÖRE GETİRİYOR https://localhost:7195/api/Rehber/userId/{id}
        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("{userId:guid}/{id:Guid}")]
        public async Task<IActionResult> GetRehberById([FromRoute]Guid id)
        {
            var existingRehber = await rehberRepository.GetRehberById(id);
            
            if(existingRehber == null)
            {
                return NotFound();
            }

            var response = new RehberDTO { 
            
                id = existingRehber.id,
                name = existingRehber.name,
                surname=existingRehber.surname,
                email = existingRehber.email,
                phone = existingRehber.phone,
                userId = existingRehber.userId
            };
            
            
            return Ok(response);

        }

        //IDLİ PUT METHODU IDYE GÖRE GÜNCELLİYOR https://localhost:7195/api/Rehber/{id}
        [HttpPut]
        [Authorize(Roles = "userRole")]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateRehberById([FromRoute]Guid id, UpdateRehberRequestDto request)
        {
            //Dtodan domain modele çeviri yap

            var Rehber = new rehberIcerik
            {
                id = id,
                name = request.name,
                surname = request.surname,
                email = request.email,
                phone = request.phone,
                
            };

            Rehber = await rehberRepository.UpdateAsync(Rehber);
            
            if(Rehber == null)
            {
                return NotFound();
                
            }
            //Domainden DTO ya çeviri
            var response = new RehberDTO
            {
                id=Rehber.id,
                name = Rehber.name,
                surname=Rehber.surname,
                email = Rehber.email,
                phone = Rehber.phone,
                userId = Rehber.userId
            };


            return Ok(response);
        }

        //IDLİ DELETE METHODU IDYE GÖRE SİLİYOR https://localhost:7195/api/Rehber/{id}
        [HttpDelete]
        [Authorize(Roles = "userRole")]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteRehber([FromRoute] Guid id)
        {
            var rehber = await rehberRepository.DeleteAsync(id);

            if(rehber is null)
            {
                return NotFound();
            }
            var response = new RehberDTO
            {
                id = rehber.id,
                name = rehber.name,
                surname = rehber.surname,
                email = rehber.email,
                phone = rehber.phone
            };

            return Ok(response);
        }

    }
}
