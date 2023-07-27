using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BrainConciergerie.Data;
using BrainConciergerie.Models;

namespace BrainConciergerie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppartsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Apparts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appart>>> GetApparts()
        {
            return await _context.Apparts.ToListAsync();
        }
        
        
        
    [HttpGet("{id}")]
    public async Task<ActionResult<Appart>> GetAppart(int id)
    {
        var appart = await _context.Apparts
            .Include(a => a.Equipements)
            .Include(a => a.Monuments)
            .Include(a => a.Restaurants)
            .Include(a => a.Bars)
            .Include(a => a.Cinemas)
            .Include(a => a.Photos)
            .Include(a => a.AutresActivites)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appart == null)
        {
            return NotFound();
        }

        return appart;
    }


    // PUT: api/Apparts/5
    [HttpPut("{id}")]
        public async Task<IActionResult> PutAppart(int id, Appart appart)
        {
            if (id != appart.Id)
            {
                return BadRequest();
            }

            _context.Entry(appart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppartExists(id))
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

        // POST: api/Apparts
        [HttpPost]
        public async Task<ActionResult<Appart>> PostAppart(Appart appart)
        {
            _context.Apparts.Add(appart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppart", new { id = appart.Id }, appart);
        }

        // DELETE: api/Apparts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Appart>> DeleteAppart(int id)
        {
            var appart = await _context.Apparts
                .Include(a => a.Equipements)
                .Include(a => a.Photos)
                .Include(a => a.Monuments)
                .Include(a => a.Restaurants)
                .Include(a => a.Bars)
                .Include(a => a.Cinemas)
                .Include(a => a.AutresActivites)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (appart == null)
            {
                return NotFound();
            }

            // Supprimer toutes les entités liées
            _context.Equipements.RemoveRange(appart.Equipements);
            _context.Photos.RemoveRange(appart.Photos);
            _context.Monuments.RemoveRange(appart.Monuments);
            _context.Restaurants.RemoveRange(appart.Restaurants);
            _context.Bars.RemoveRange(appart.Bars);
            _context.Cinemas.RemoveRange(appart.Cinemas);
            _context.AutresActivites.RemoveRange(appart.AutresActivites);

            // Supprimer l'appartement
            _context.Apparts.Remove(appart);
            await _context.SaveChangesAsync();

            return appart;
        }


        private bool AppartExists(int id)
        {
            return _context.Apparts.Any(e => e.Id == id);
        }
    }

}
