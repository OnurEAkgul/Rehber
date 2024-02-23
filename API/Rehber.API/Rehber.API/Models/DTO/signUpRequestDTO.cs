using Rehber.API.Models.Domain;

namespace Rehber.API.Models.DTO
{
    // Yeni kullanıcı kaydı oluşturma isteğini temsil eden DTO (Data Transfer Object) sınıfı.
    public class signUpRequestDTO
    {
        // Yeni kullanıcının adı.
        public string userName { get; set; }

        // Yeni kullanıcının şifresi.
        public string userPassword { get; set; }

        // Yeni kullanıcının e-posta adresi.
        public string userEmail { get; set; }
    }
}
