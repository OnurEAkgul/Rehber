namespace Rehber.API.Models.DTO
{
    // Kullanıcı girişi için kullanılan DTO (Data Transfer Object) sınıfı.
    public class LoginResponseDTO
    {
        // Kullanıcının e-posta adresi.
        public string userEmail { get; set; }
        // Kullanıcının e-posta adresi.
        public string userName { get; set; }

        // Oluşturulan JWT (Json Web Token) kullanıcı tarafından alınan bir token.
        public string token { get; set; }

        // Kullanıcının rollerini içeren liste.
        public List<string> role { get; set; }

        // Kullanıcının benzersiz tanımlayıcısı (ID).
        public Guid userId { get; set; }
    }
}
