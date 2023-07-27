
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BrainConciergerie.Models
{
    public class Appart
    {

        public Appart()
        {

        }
        [Key]
        public int Id { get; set; }

        public string? Nom { get; set; }

        public string? Localisation { get; set; }

        public string? Poubelles { get; set; }

        public string? Transports { get; set; }

        public string? Consignes { get; set; }

        public string? Parking { get; set; }

        [JsonIgnore]
        public ICollection<Photos>? Photos { get; set; }

        [JsonIgnore]
        public ICollection<Equipements>? Equipements { get; set; }

        [JsonIgnore]
        public ICollection<Monuments>? Monuments { get; set; }

        [JsonIgnore]
        public ICollection<Restaurants>? Restaurants { get; set; }

        [JsonIgnore]
        public ICollection<Bars>? Bars { get; set; }

        [JsonIgnore]
        public ICollection<Cinemas>? Cinemas { get; set; }

        [JsonIgnore]
        public ICollection<AutresActivites>? AutresActivites { get; set; }

        [JsonIgnore]
        public ICollection<NotationsAppart>? NotationsAppart { get; set;}
    }


}