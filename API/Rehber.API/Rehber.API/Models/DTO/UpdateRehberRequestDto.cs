namespace Rehber.API.Models.DTO
{
    // Rehber güncelleme isteğini temsil eden DTO (Data Transfer Object) sınıfı.
    public class UpdateRehberRequestDto
    {
        // Yeni isim.
        public string name { get; set; }

        // Yeni soyisim.
        public string surname { get; set; }

        // Yeni e-posta adresi.
        public string email { get; set; }

        // Yeni telefon numarası.
        public string phone { get; set; }
    }
}
