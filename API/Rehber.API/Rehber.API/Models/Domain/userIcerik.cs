using System.ComponentModel.DataAnnotations;

namespace Rehber.API.Models.Domain
{
    public class userIcerik
    {

        [Key]
        public Guid userId { get; set; }
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string userEmail { get; set; }


    }
}
