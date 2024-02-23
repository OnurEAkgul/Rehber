namespace Rehber.API.Models.DTO
{
    // Kullanıcı verilerini transfer etmek için kullanılan DTO (Data Transfer Object) sınıfı.
    public class UserDTO
    {
        // Kullanıcının benzersiz kimliği (userID).
        public Guid userId { get; set; }

        // Kullanıcı adı.
        public string userName { get; set; }

        // Kullanıcının şifresi.
        public string userPassword { get; set; }

        // Kullanıcının e-posta adresi.
        public string userEmail { get; set; }
    }
}
