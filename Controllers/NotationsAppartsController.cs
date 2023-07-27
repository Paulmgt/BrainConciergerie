using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrainConciergerie.Data;
using BrainConciergerie.Models;

namespace BrainConciergerie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotationsAppartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotationsAppartsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/NotationsApparts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotationAppartDTO>>> GetNotationsApparts()
        {
            var notations = await _context.NotationsAppart
                .Include(n => n.Appart)
                .Select(n => new NotationAppartDTO
                {
                    Id = n.Id,
                    NomClient = n.NomClient,
                    Commentaire = n.Commentaire,
                    AppartementId = n.Appart.Id,
                    AppartementNom = n.Appart.Nom,
                    // add other properties as needed
                })
                .ToListAsync();

            return notations;
        }



        // GET: api/NotationsApparts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotationsAppart>> GetNotationsAppart(int id)
        {
            var notationsAppart = await _context.NotationsAppart.FindAsync(id);

            if (notationsAppart == null)
            {
                return NotFound();
            }

            return notationsAppart;
        }

        // PUT: api/NotationsApparts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotationsAppart(int id, NotationsAppart notationsAppart)
        {
            if (id != notationsAppart.Id)
            {
                return BadRequest();
            }

            _context.Entry(notationsAppart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotationsAppartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/NotationsApparts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        public async Task<ActionResult<NotationsAppart>> PostNotationsAppart(NotationsAppart notationsAppart)
        {
            // Vérifiez si _context.NotationsAppart est null
            if (_context.NotationsAppart == null)
            {
                return Problem("Entity set 'ApplicationDbContext.NotationsAppart'  is null.");
            }

            // Trouvez l'appartement associé
            var appart = await _context.Apparts.FindAsync(notationsAppart.AppartId);

            if (appart == null)
            {
                return NotFound("Appartement not found.");
            }

            // Associez l'appartement trouvé à notationsAppart
            notationsAppart.Appart = appart;

            // Ajoutez notationsAppart à _context.NotationsAppart
            _context.NotationsAppart.Add(notationsAppart);

            // Enregistrez les changements dans la base de données
            await _context.SaveChangesAsync();

            // Renvoyez la réponse avec les données de notationsAppart
            return CreatedAtAction("GetNotationsAppart", new { id = notationsAppart.Id }, notationsAppart);
        }

        // DELETE: api/NotationsApparts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotationsAppart(int id)
        {
            if (_context.NotationsAppart == null)
            {
                return NotFound();
            }
            var notationsAppart = await _context.NotationsAppart.FindAsync(id);
            if (notationsAppart == null)
            {
                return NotFound();
            }

            _context.NotationsAppart.Remove(notationsAppart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NotationsAppartExists(int id)
        {
            return (_context.NotationsAppart?.Any(e => e.Id == id)).GetValueOrDefault();
        }

    }
}
