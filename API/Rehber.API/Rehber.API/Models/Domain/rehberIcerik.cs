using System.ComponentModel.DataAnnotations.Schema;

namespace Rehber.API.Models.Domain
{
    // Rehber içeriğini temsil eden sınıf.
    public class rehberIcerik
    {
        // Rehber öğesinin benzersiz kimliği.
        public Guid id { get; set; }

        // Rehber öğesinin adı.
        public string name { get; set; }

        // Rehber öğesinin soyadı.
        public string surname { get; set; }

        // Rehber öğesinin e-posta adresi.
        public string email { get; set; }

        // Rehber öğesinin telefon numarası.
        public string phone { get; set; }

        // userIcerik tablosuyla ilişkilendirilmiş dış anahtar, ve sütun adı belirtilmiştir.
        [ForeignKey("userIcerik")]
        public Guid userId { get; set; }

        // userIcerik tablosuyla ilişkilendirilmiş navigasyon özelliği.
        public userIcerik userIcerik { get; set; }
    }
}
