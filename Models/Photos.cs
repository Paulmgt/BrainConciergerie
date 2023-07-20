using System;
namespace BrainConciergerie.Models
{
	public class Photos
	{
		public Photos()
		{
		}

		public int Id { get; set; }

        public string? Nom { get; set; }

		public byte[]? PhotoFile { get; set; }

        public int? AppartsId { get; set; }

        public Appart? Appartement { get; set; }
    }
}

