using BrainConciergerie.Models;
using Microsoft.EntityFrameworkCore;

namespace BrainConciergerie.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Appart> Apparts { get; set; }
        public DbSet<Bars> Bars { get; set; }
        public DbSet<Equipements> Equipements { get; set; }
        public DbSet<Restaurants> Restaurants { get; set; }
        public DbSet<Cinemas> Cinemas { get; set; }
        public DbSet<Photos> Photos { get; set; }
        public DbSet<AutresActivites> AutresActivites { get; set; }
        public DbSet<Monuments> Monuments { get; set; }
        public DbSet<NotationsAppart> NotationsAppart { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuration de la relation many-to-many entre Appart et Equipements
        }



        public DbSet<BrainConciergerie.Models.NotationAppartDTO> NotationAppartDTO { get; set; } = default!;

    }
}
