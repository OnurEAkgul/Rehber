namespace Rehber.API.Models.DTO
{
    // Kullanıcı girişi isteği için kullanılan DTO (Data Transfer Object) sınıfı.
    public class LoginRequestDTO
    {
        // Kullanıcının e-posta adresi.
        public string userEmail { get; set; }

        // Kullanıcının şifresi.
        public string userPassword { get; set; }
    }
}
