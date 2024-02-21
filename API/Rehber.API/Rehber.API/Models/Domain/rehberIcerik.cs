using System.ComponentModel.DataAnnotations.Schema;

namespace Rehber.API.Models.Domain
{
    public class rehberIcerik
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string email { get; set; }
        public string phone { get; set; }


        // Foreign key property with explicitly specified column name
        [ForeignKey("userIcerik")]
        public Guid userId { get; set; }

        // Navigation property
        public userIcerik userIcerik { get; set; }
    }
}
