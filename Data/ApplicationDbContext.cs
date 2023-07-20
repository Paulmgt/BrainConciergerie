using BrainConciergerie.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace BrainConciergerie.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Appart> Appartements { get; set; }
        public DbSet<Bars> Bars { get; set; }
        public DbSet<Equipements> Equipements { get; set; }
        public DbSet<Restaurants> Restaurants { get; set; }
        public DbSet<Cinema> Cinema { get; set; }
        public DbSet<Photos> Photos { get; set; }
        public DbSet<AutresActivites> AutresActivites { get; set; }
        public DbSet<Monuments> Monuments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ajoutez ici des configurations supplémentaires pour vos entités si nécessaire.
        }
    }
}
