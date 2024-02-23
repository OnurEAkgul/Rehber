namespace Rehber.API.Models.DTO
{
    // Kullanıcının güncelleme isteğini temsil eden DTO (Data Transfer Object) sınıfı.
    public class UpdateUserRequestDTO
    {
        // Yeni kullanıcı adı.
        public string userName { get; set; }

        // Yeni kullanıcı e-posta adresi.
        public string userEmail { get; set; }

        // Yeni şifre (Opsiyonel, null olabilir).
        public string? newPassword { get; set; }

        // Mevcut şifre.
        public string currentPassword { get; set; }
    }
}
