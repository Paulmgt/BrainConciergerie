using System;
namespace BrainConciergerie.Models
{
	public class Equipements
	{
		public Equipements()
		{
		}

		public int Id { get; set; }

		public string? Nom { get; set; }

		public int? Quantite { get; set; }

        public string? Description { get; set; }

        public int? AppartsId { get; set; }

        public Appart? Appartement { get; set; }
    }
}

