using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BrainConciergerie.Models
{
    public class NotationsAppart
    {

        public NotationsAppart()
        { 
        }

        [Key]
        public int Id { get; set; }

        public string? NomClient { get; set; }

        public string? Commentaire { get; set; }

        public int? AppartId { get; set; }
        [JsonIgnore]
        public Appart? Appart { get; set; }
    }
}
