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
    public class BarsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BarsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BarsDTO>>> GetBars()
        {
            if (_context.Bars == null)
            {
                return NotFound();
            }

            var bars = await _context.Bars.ToListAsync();

            var barsDTOs = bars.Select(b => new BarsDTO
            {
                Id = b.Id,
                Nom = b.Nom,
                Localisation = b.Localisation,
                Description = b.Description,
                AppartementId = b.AppartId,
            }).ToList();

            return barsDTOs;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BarsDTO>> GetBars(int id)
        {
            if (_context.Bars == null)
            {
                return NotFound();
            }

            var bars = await _context.Bars.FindAsync(id);

            if (bars == null)
            {
                return NotFound();
            }

            var barsDTO = new BarsDTO
            {
                Id = bars.Id,
                Nom = bars.Nom,
                Localisation = bars.Localisation,
                Description = bars.Description,
                AppartementId = bars.AppartId,
            };

            return barsDTO;
        }


        // POST: api/Bars
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bars>> PostBars(Bars bars)
        {
          if (_context.Bars == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Bars'  is null.");
          }
            _context.Bars.Add(bars);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBars", new { id = bars.Id }, bars);
        }

        // DELETE: api/Bars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBars(int id)
        {
            if (_context.Bars == null)
            {
                return NotFound();
            }
            var bars = await _context.Bars.FindAsync(id);
            if (bars == null)
            {
                return NotFound();
            }

            _context.Bars.Remove(bars);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BarsExists(int id)
        {
            return (_context.Bars?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("{appartementId}/bars")]
        public async Task<ActionResult<IEnumerable<BarsDTO>>> GetBarsByAppartementId(int appartementId)
        {
            var bars = await _context.Bars
                .Where(b => b.Appart.Id == appartementId)
                .Select(b => new BarsDTO
                {
                    Id = b.Id,
                    Nom = b.Nom,
                    Localisation = b.Localisation,
                    Description = b.Description,
                    AppartementId = b.Appart.Id
                })
                .ToListAsync();

            if (!bars.Any())
            {
                return NotFound();
            }

            return bars;
        }

    }
}
