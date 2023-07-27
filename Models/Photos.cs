using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BrainConciergerie.Models
{
    public class Photos
    {
        public Photos()
        {
        }

        [Key]
        public int Id { get; set; }

        public string? Nom { get; set; }

        public byte[]? PhotoFile { get; set; }

        [NotMapped]
        public string? PhotoFileBase64
        {
            get
            {
                return PhotoFile == null ? null : Convert.ToBase64String(PhotoFile);
            }
        }

        public int? AppartId { get; set; }

        [JsonIgnore]
        public Appart? Appart { get; set; }


    }
}

