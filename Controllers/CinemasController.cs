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
    public class CinemasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CinemasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Cinemas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CinemasDTO>>> GetCinemas()
        {
            if (_context.Cinemas == null)
            {
                return NotFound();
            }

            var cinemas = await _context.Cinemas.ToListAsync();

            var cinemasDTOs = cinemas.Select(c => new CinemasDTO
            {
                Id = c.Id,
                Nom = c.Nom,
                Localisation = c.Localisation,
                Description = c.Description,
                AppartementId = c.AppartId,
            }).ToList();

            return cinemasDTOs;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CinemasDTO>> GetCinemas(int id)
        {
            if (_context.Cinemas == null)
            {
                return NotFound();
            }

            var cinemas = await _context.Cinemas.FindAsync(id);

            if (cinemas == null)
            {
                return NotFound();
            }

            var cinemasDTO = new CinemasDTO
            {
                Id = cinemas.Id,
                Nom = cinemas.Nom,
                Localisation = cinemas.Localisation,
                Description = cinemas.Description,
                AppartementId = cinemas.AppartId,
            };

            return cinemasDTO;
        }


        // PUT: api/Cinemas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCinemas(int id, Cinemas cinemas)
        {
            if (id != cinemas.Id)
            {
                return BadRequest();
            }

            _context.Entry(cinemas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CinemasExists(id))
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

        // POST: api/Cinemas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cinemas>> PostCinemas(Cinemas cinemas)
        {
          if (_context.Cinemas == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Cinemas'  is null.");
          }
            _context.Cinemas.Add(cinemas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCinemas", new { id = cinemas.Id }, cinemas);
        }

        // DELETE: api/Cinemas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCinemas(int id)
        {
            if (_context.Cinemas == null)
            {
                return NotFound();
            }
            var cinemas = await _context.Cinemas.FindAsync(id);
            if (cinemas == null)
            {
                return NotFound();
            }

            _context.Cinemas.Remove(cinemas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CinemasExists(int id)
        {
            return (_context.Cinemas?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("{appartementId}/monuments")]
        public async Task<ActionResult<IEnumerable<MonumentsDTO>>> GetMonumentsByAppartementId(int appartementId)
        {
            var monuments = await _context.Monuments
                .Where(m => m.Appart.Id == appartementId)
                .Select(m => new MonumentsDTO
                {
                    Id = m.Id,
                    Nom = m.Nom,
                    Localisation = m.Localisation,
                    Description = m.Description,
                    AppartementId = m.Appart.Id,
                })
                .ToListAsync();

            if (!monuments.Any())
            {
                return NotFound();
            }

            return monuments;
        }

    }
}
