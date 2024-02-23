namespace Rehber.API.Models.DTO
{
    // Yeni bir rehber öğesi oluşturma isteği için kullanılan DTO (Data Transfer Object) sınıfı.
    public class CreateRehberRequest
    {
        // Rehber öğesinin adı.
        public string name { get; set; }

        // Rehber öğesinin soyadı.
        public string surname { get; set; }

        // Rehber öğesinin e-posta adresi.
        public string email { get; set; }

        // Rehber öğesinin telefon numarası.
        public string phone { get; set; }
    }
}
