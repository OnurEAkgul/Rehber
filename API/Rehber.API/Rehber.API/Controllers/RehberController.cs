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



        [HttpPost]
        public async Task<IActionResult> CreateRehber([FromBody] CreateRehberRequest request)
        {
            //DTO dan domain modeline
            var rehber = new rehberIcerik
            {
                name = request.name,
                surname = request.surname,
                email = request.email,
                phone = request.phone
            };


            await rehberRepository.CreateAsync(rehber);

            //Domain modelinden DTO ya

            var response = new RehberDTO
            {
                id = rehber.id,
                name = rehber.name,
                surname = rehber.surname,
                email = rehber.email,
                phone = rehber.phone
            };

            return Ok();
        }

        //Get methodu https://localhost:7195/api/Rehber
        [HttpGet]
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
                    phone = item.phone }
                );
            }

            return Ok(response);
        }


        //Get methodu https://localhost:7195/api/Rehber/{id}
        [HttpGet]
        [Route("{id:Guid}")]
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
                phone = existingRehber.phone
            };
            
            
            return Ok(response);

        }

        //Put methodu https://localhost:7195/api/Rehber/{id}
        [HttpPut]
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
                phone = request.phone
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
                phone = Rehber.phone
            };


            return Ok(response);
        }

        //Delete methodu https://localhost:7195/api/Rehber/{id}
        [HttpDelete]
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
