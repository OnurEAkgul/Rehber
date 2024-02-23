namespace Rehber.API.Models.DTO
{
    // Rehber verilerini temsil eden DTO (Data Transfer Object) sınıfı.
    public class RehberDTO
    {
        // Rehber öğesinin benzersiz tanımlayıcısı (ID).
        public Guid id { get; set; }

        // Rehber öğesinin adı.
        public string name { get; set; }

        // Rehber öğesinin soyadı.
        public string surname { get; set; }

        // Rehber öğesinin e-posta adresi.
        public string email { get; set; }

        // Rehber öğesinin telefon numarası.
        public string phone { get; set; }

        // Rehber öğesinin sahip olduğu kullanıcının benzersiz tanımlayıcısı (ID).
        public Guid userId { get; set; }
    }
}
