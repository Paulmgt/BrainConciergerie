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
    public class AutresActivitesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AutresActivitesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AutresActivites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AutresActivitesDTO>>> GetAutresActivites()
        {
            if (_context.AutresActivites == null)
            {
                return NotFound();
            }

            var autresActivites = await _context.AutresActivites.ToListAsync();

            var autresActivitesDTOs = autresActivites.Select(a => new AutresActivitesDTO
            {
                Id = a.Id,
                Nom = a.Nom,
                Localisation = a.Localisation,
                Description = a.Description,
                AppartementId = a.AppartId,
            }).ToList();

            return autresActivitesDTOs;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AutresActivitesDTO>> GetAutresActivites(int id)
        {
            if (_context.AutresActivites == null)
            {
                return NotFound();
            }

            var autresActivites = await _context.AutresActivites.FindAsync(id);

            if (autresActivites == null)
            {
                return NotFound();
            }

            var autresActivitesDTO = new AutresActivitesDTO
            {
                Id = autresActivites.Id,
                Nom = autresActivites.Nom,
                Localisation = autresActivites.Localisation,
                Description = autresActivites.Description,
                AppartementId = autresActivites.AppartId,
            };

            return autresActivitesDTO;
        }


        // PUT: api/AutresActivites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutresActivites(int id, AutresActivites autresActivites)
        {
            if (id != autresActivites.Id)
            {
                return BadRequest();
            }

            _context.Entry(autresActivites).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutresActivitesExists(id))
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

        // POST: api/AutresActivites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AutresActivites>> PostAutresActivites(AutresActivites autresActivites)
        {
          if (_context.AutresActivites == null)
          {
              return Problem("Entity set 'ApplicationDbContext.AutresActivites'  is null.");
          }
            _context.AutresActivites.Add(autresActivites);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAutresActivites", new { id = autresActivites.Id }, autresActivites);
        }

        // DELETE: api/AutresActivites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAutresActivites(int id)
        {
            if (_context.AutresActivites == null)
            {
                return NotFound();
            }
            var autresActivites = await _context.AutresActivites.FindAsync(id);
            if (autresActivites == null)
            {
                return NotFound();
            }

            _context.AutresActivites.Remove(autresActivites);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AutresActivitesExists(int id)
        {
            return (_context.AutresActivites?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        [HttpGet("{appartementId}/autresactivites")]
        public async Task<ActionResult<IEnumerable<AutresActivitesDTO>>> GetAutresActivitesByAppartementId(int appartementId)
        {
            var autresActivites = await _context.AutresActivites
                .Where(a => a.AppartId == appartementId)
                .Select(a => new AutresActivitesDTO
                {
                    Id = a.Id,
                    Nom = a.Nom,
                    Description = a.Description,
                    Localisation = a.Localisation,
                    AppartementId = a.AppartId,
                })
                .ToListAsync();

            if (!autresActivites.Any())
            {
                return NotFound();
            }

            return autresActivites;
        }

    }
}
