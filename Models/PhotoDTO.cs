using System.ComponentModel.DataAnnotations;

namespace BrainConciergerie.Models
{
    public class PhotoDTO
    {
        [Key]
        public int Id { get; set; }
        public string? Nom { get; set; }

        public byte[]? PhotoFile { get; set; }

        public int? AppartementId { get; set; }

    }
}
