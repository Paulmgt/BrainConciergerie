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
    public class MonumentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MonumentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Monuments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MonumentsDTO>>> GetMonuments()
        {
            if (_context.Monuments == null)
            {
                return NotFound();
            }

            var monuments = await _context.Monuments.ToListAsync();

            var monumentsDTOs = monuments.Select(m => new MonumentsDTO
            {
                Id = m.Id,
                Nom = m.Nom,
                Localisation = m.Localisation,
                Description = m.Description,
                AppartementId = m.AppartId,
            }).ToList();

            return monumentsDTOs;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MonumentsDTO>> GetMonuments(int id)
        {
            if (_context.Monuments == null)
            {
                return NotFound();
            }

            var monuments = await _context.Monuments.FindAsync(id);

            if (monuments == null)
            {
                return NotFound();
            }

            var monumentsDTO = new MonumentsDTO
            {
                Id = monuments.Id,
                Nom = monuments.Nom,
                Localisation = monuments.Localisation,
                Description = monuments.Description,
                AppartementId = monuments.AppartId,
            };

            return monumentsDTO;
        }


        // PUT: api/Monuments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMonuments(int id, Monuments monuments)
        {
            if (id != monuments.Id)
            {
                return BadRequest();
            }

            _context.Entry(monuments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MonumentsExists(id))
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

        // POST: api/Monuments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Monuments>> PostMonuments(Monuments monuments)
        {
          if (_context.Monuments == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Monuments'  is null.");
          }
            _context.Monuments.Add(monuments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMonuments", new { id = monuments.Id }, monuments);
        }

        // DELETE: api/Monuments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonuments(int id)
        {
            if (_context.Monuments == null)
            {
                return NotFound();
            }
            var monuments = await _context.Monuments.FindAsync(id);
            if (monuments == null)
            {
                return NotFound();
            }

            _context.Monuments.Remove(monuments);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MonumentsExists(int id)
        {
            return (_context.Monuments?.Any(e => e.Id == id)).GetValueOrDefault();
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
