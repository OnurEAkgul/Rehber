using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rehber.API.Models.Domain
{
    public class userIcerik
    {
        [Key]
        public Guid userId { get; set; }
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string userEmail { get; set; }


        // Adjust the foreign key property
        [ForeignKey("AspNetUser")]
        public string AspNetUserId { get; set; }

        // Adjust the navigation property
        [ForeignKey("AspNetUserId")]
        public IdentityUser AspNetUser { get; set; }

        // Navigation property
        public ICollection<rehberIcerik> RehberIcerikList { get; set; }


    }
}
