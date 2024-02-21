namespace Rehber.API.Models.DTO
{
    public class UpdateUserRequestDTO
    {

        public string userName { get; set; }
        public string userEmail { get; set; }
        public string? newPassword { get; set; }
        public string currentPassword { get; set; }

    }
}
