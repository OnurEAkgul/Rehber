namespace Rehber.API.Models.DTO
{
    public class RehberDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }

        public string surname { get; set; }

        public string email { get; set; } 

        public string phone  { get; set; }

        public Guid userId { get; set; }
    }
}
