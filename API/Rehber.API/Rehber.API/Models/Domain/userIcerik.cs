using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rehber.API.Models.Domain
{
    // Kullanıcı içeriğini temsil eden sınıf.
    public class userIcerik
    {
        // Kullanıcının benzersiz kimliği.
        [Key]
        public Guid userId { get; set; }

        // Kullanıcının adı.
        public string userName { get; set; }

        // Kullanıcının şifresi.
        public string userPassword { get; set; }

        // Kullanıcının e-posta adresi.
        public string userEmail { get; set; }

        // AspNetUser tablosuyla ilişkilendirilmiş dış anahtar.
        [ForeignKey("AspNetUser")]
        public string AspNetUserId { get; set; }

        // AspNetUser tablosuyla ilişkilendirilmiş navigasyon özelliği.
        [ForeignKey("AspNetUserId")]
        public IdentityUser AspNetUser { get; set; }

        // RehberIcerikList koleksiyonunu içeren navigasyon özelliği.
        public ICollection<rehberIcerik> RehberIcerikList { get; set; }
    }
}
