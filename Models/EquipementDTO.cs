namespace BrainConciergerie.Models
{
    public class EquipementDTO
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public int? Quantite { get; set; }
        public string? Description { get; set; }
        public int? AppartementId { get; set; }
    }

}
