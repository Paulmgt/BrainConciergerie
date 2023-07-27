using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BrainConciergerie.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Text.Json.Serialization;

namespace BrainConciergerie.Models
{
    public class Equipements
    {
        public Equipements()
        {
        }

        [Key]
        public int Id { get; set; }

        public string? Nom { get; set; }

        public int? Quantite { get; set; }

        public string? Description { get; set; }


        public int? AppartId { get; set; }

        [JsonIgnore]
        public Appart? Appart { get; set; }

    }

}




