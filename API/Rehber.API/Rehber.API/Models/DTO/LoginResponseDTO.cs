namespace Rehber.API.Models.DTO
{
    public class LoginResponseDTO
    {

        public string userEmail { get; set; }
        public string token { get; set; }
        public List<string> role { get; set; }

        public Guid userId { get; set; }
    }
}
