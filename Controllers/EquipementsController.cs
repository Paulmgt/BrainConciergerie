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
    public class EquipementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EquipementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Equipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipementDTO>>> GetEquipements()
        {
            if (_context.Equipements == null)
            {
                return NotFound();
            }

            var equipements = await _context.Equipements.Include(e => e.Appart).ToListAsync();

            var equipementDtos = equipements.Select(equipement => new EquipementDTO
            {
                Id = equipement.Id,
                // assigner d'autres propriétés de l'équipement...

                AppartementId = equipement.Appart.Id,
                // assigner d'autres propriétés de l'appartement...
            }).ToList();

            return equipementDtos;
        }

        // GET: api/Equipements/5
        // GET: api/Equipements/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EquipementDTO>> GetEquipement(int id)
        {
            if (_context.Equipements == null)
            {
                return NotFound();
            }

            var equipement = await _context.Equipements.FindAsync(id);

            if (equipement == null)
            {
                return NotFound();
            }

            var equipementDTO = new EquipementDTO
            {
                Id = equipement.Id,
                Nom = equipement.Nom,
                Description = equipement.Description,
                AppartementId = equipement.AppartId,
            };

            return equipementDTO;
        }



        // PUT: api/Equipements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipements(int id, Equipements equipements)
        {
            if (id != equipements.Id)
            {
                return BadRequest();
            }

            _context.Entry(equipements).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipementsExists(id))
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

        // POST: api/Equipements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostEquipements(Equipements equipements)
        {
            if (equipements.AppartId == null)
            {
                return BadRequest("AppartId is required.");
            }

            // Vérifiez si l'appartement correspondant existe.
            var appart = await _context.Apparts.FindAsync(equipements.AppartId);
            if (appart == null)
            {
                return BadRequest("Appartement does not exist.");
            }

            _context.Equipements.Add(equipements);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EquipementExists(equipements.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEquipements", new { id = equipements.Id }, equipements);
        }

        private bool EquipementExists(int id)
        {
            return _context.Equipements.Any(e => e.Id == id);
        }


        // DELETE: api/Equipements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipements(int id)
        {
            if (_context.Equipements == null)
            {
                return NotFound();
            }
            var equipements = await _context.Equipements.FindAsync(id);
            if (equipements == null)
            {
                return NotFound();
            }

            _context.Equipements.Remove(equipements);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EquipementsExists(int id)
        {
            return (_context.Equipements?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        [HttpGet("{appartementId}/equipements")]
        public async Task<ActionResult<IEnumerable<EquipementDTO>>> GetEquipementsByAppartementId(int appartementId)
        {
            var equipements = await _context.Equipements
                .Where(e => e.Appart.Id == appartementId)
                .Select(e => new EquipementDTO
                {
                    Id = e.Id,
                    Nom = e.Nom,
                    Quantite = e.Quantite,
                    Description = e.Description,
                    AppartementId = e.Appart.Id,
                })
                .ToListAsync();

            if (!equipements.Any())
            {
                return NotFound();
            }

            return equipements;
        }



    }
}
