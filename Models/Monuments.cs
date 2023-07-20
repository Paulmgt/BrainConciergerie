using System;
namespace BrainConciergerie.Models
{
	public class Monuments
	{
		public Monuments()
		{
		}

        public int Id { get; set; }

        public string? Nom { get; set; }

        public string? Localisation { get; set; }

        public string? Description { get; set; }

        public int? AppartsId { get; set; }

        public Appart? Appartement { get; set; }
    }
}

