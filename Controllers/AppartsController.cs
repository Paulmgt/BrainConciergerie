using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BrainConciergerie.Models;
using Microsoft.AspNetCore.Authorization;
using BrainConciergerie.Data;

[ApiController]
[Route("[controller]")]
public class AppartsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AppartsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Apparts
    [HttpGet(Name = "GetApparts")]
    public async Task<ActionResult<IEnumerable<Appart>>> GetApparts()
    {
        var apparts = await _context.Appartements.ToListAsync();
        if (apparts == null || apparts.Count == 0)
        {
            return NotFound();
        }

        return Ok(apparts);
    }

    // GET: Apparts/5
    [HttpGet("{id}", Name = "GetAppart")]
    public async Task<ActionResult<Appart>> GetAppart(int id)
    {
        var appart = await _context.Appartements.FindAsync(id);
        if (appart == null)
        {
            return NotFound();
        }

        return Ok(appart);
    }

    // POST: Apparts
    [HttpPost]
    public async Task<ActionResult<Appart>> CreateAppart(Appart appart)
    {
        if (ModelState.IsValid)
        {
#pragma warning disable CS0168 // La variable est déclarée mais jamais utilisée
            try
            {
                _context.Appartements.Add(appart);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAppart), new { id = appart.Id }, appart);
            }
            catch (Exception ex)
            {
                // Gérer les erreurs ou les exceptions, par exemple, les journaliser pour le débogage
                return StatusCode(500, "Une erreur s'est produite lors de la création de l'appartement.");
            }
#pragma warning restore CS0168 // La variable est déclarée mais jamais utilisée
        }

        return BadRequest(ModelState);
    }

    // PUT: Apparts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAppart(int id, Appart appart)
    {
        if (id != appart.Id)
        {
            return BadRequest();
        }

        if (ModelState.IsValid)
        {
#pragma warning disable CS0168 // La variable est déclarée mais jamais utilisée
            try
            {
                _context.Entry(appart).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
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
            catch (Exception ex)
            {
                // Gérer les erreurs ou les exceptions, par exemple, les journaliser pour le débogage
                return StatusCode(500, "Une erreur s'est produite lors de la mise à jour de l'appartement.");
            }
#pragma warning restore CS0168 // La variable est déclarée mais jamais utilisée
        }

        return BadRequest(ModelState);
    }

    // DELETE: Apparts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppart(int id)
    {
        var appart = await _context.Appartements.FindAsync(id);
        if (appart == null)
        {
            return NotFound();
        }

        _context.Appartements.Remove(appart);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AppartExists(int id)
    {
        return _context.Appartements.Any(e => e.Id == id);
    }
}
