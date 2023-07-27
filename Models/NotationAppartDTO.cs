using System.ComponentModel.DataAnnotations;

namespace BrainConciergerie.Models
{
    public class NotationAppartDTO
    {

        [Key]
        public int Id { get; set; }

        public string? NomClient { get; set; }

        public string? Commentaire { get; set; }

        public int? AppartementId { get; set; }

        public string? AppartementNom { get; set; }


    }
}
