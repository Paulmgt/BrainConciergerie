using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BrainConciergerie.Data;
using BrainConciergerie.Models;

namespace AppartsAppReactCs.Controllers
{
    public class EquipementsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EquipementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Equipements
        public async Task<IActionResult> Index()
        {
              return _context.Equipements != null ? 
                          View(await _context.Equipements.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Equipements'  is null.");
        }

        // GET: Equipements/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Equipements == null)
            {
                return NotFound();
            }

            var equipements = await _context.Equipements
                .FirstOrDefaultAsync(m => m.Id == id);
            if (equipements == null)
            {
                return NotFound();
            }

            return View(equipements);
        }

        // GET: Equipements/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Equipements/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Quantite,Description,AppartsId")] Equipements equipements)
        {
            if (ModelState.IsValid)
            {
                _context.Add(equipements);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(equipements);
        }

        // GET: Equipements/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Equipements == null)
            {
                return NotFound();
            }

            var equipements = await _context.Equipements.FindAsync(id);
            if (equipements == null)
            {
                return NotFound();
            }
            return View(equipements);
        }

        // POST: Equipements/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Quantite,Description,AppartsId")] Equipements equipements)
        {
            if (id != equipements.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(equipements);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EquipementsExists(equipements.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(equipements);
        }

        // GET: Equipements/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Equipements == null)
            {
                return NotFound();
            }

            var equipements = await _context.Equipements
                .FirstOrDefaultAsync(m => m.Id == id);
            if (equipements == null)
            {
                return NotFound();
            }

            return View(equipements);
        }

        // POST: Equipements/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Equipements == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Equipements'  is null.");
            }
            var equipements = await _context.Equipements.FindAsync(id);
            if (equipements != null)
            {
                _context.Equipements.Remove(equipements);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EquipementsExists(int id)
        {
          return (_context.Equipements?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
