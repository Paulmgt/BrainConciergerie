using System.ComponentModel.DataAnnotations;

namespace BrainConciergerie.Models
{
    public class CinemasDTO
    {
        [Key]
        public int Id { get; set; }

        public string? Nom { get; set; }

        public string? Localisation { get; set; }

        public string? Description { get; set; }

        public int? AppartementId { get; set; }


    }
}
