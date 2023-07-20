using System;
namespace BrainConciergerie.Models
{
	public class Appart
	{
		public Appart()
		{
		}

		public int Id { get; set; }

        public string? Nom { get; set; }

        public string? Localisation { get; set; }

        public List<Photos>? Photos { get; set; }

        public List<Equipements>? Equipements { get; set; }

        public string? Poubelles { get; set; }

        public List<Monuments>? Monuments { get; set; }

        public string? Transports { get; set; }

        public string? Consignes { get; set; }

        public string? Parking { get; set; }

        public List<Restaurants>? Restaurants { get; set; }

        public List<Bars>? Bar { get; set; }

        public List<Cinema>? Cinema { get; set; }

        public List<AutresActivites>? AutresActivites { get; set; }

    }
}

