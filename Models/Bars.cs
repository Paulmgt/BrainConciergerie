using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BrainConciergerie.Models
{
    public class Bars
    {
        public Bars()
        {
        }

        [Key]
        public int Id { get; set; }

        public string? Nom { get; set; }

        public string? Localisation { get; set; }

        public string? Description { get; set; }

        public int? AppartId { get; set; }

        [JsonIgnore]
        public Appart? Appart { get; set; }
    }
}

