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
    public class AutreActivitésController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AutreActivitésController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: AutreActivités
        public async Task<IActionResult> Index()
        {
              return _context.AutresActivites != null ? 
                          View(await _context.AutresActivites.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.AutresActivites'  is null.");
        }

        // GET: AutreActivités/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.AutresActivites == null)
            {
                return NotFound();
            }

            var autresActivites = await _context.AutresActivites
                .FirstOrDefaultAsync(m => m.Id == id);
            if (autresActivites == null)
            {
                return NotFound();
            }

            return View(autresActivites);
        }

        // GET: AutreActivités/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: AutreActivités/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Localisation,Description,AppartsId")] AutresActivites autresActivites)
        {
            if (ModelState.IsValid)
            {
                _context.Add(autresActivites);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(autresActivites);
        }

        // GET: AutreActivités/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.AutresActivites == null)
            {
                return NotFound();
            }

            var autresActivites = await _context.AutresActivites.FindAsync(id);
            if (autresActivites == null)
            {
                return NotFound();
            }
            return View(autresActivites);
        }

        // POST: AutreActivités/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Localisation,Description,AppartsId")] AutresActivites autresActivites)
        {
            if (id != autresActivites.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(autresActivites);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AutresActivitesExists(autresActivites.Id))
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
            return View(autresActivites);
        }

        // GET: AutreActivités/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.AutresActivites == null)
            {
                return NotFound();
            }

            var autresActivites = await _context.AutresActivites
                .FirstOrDefaultAsync(m => m.Id == id);
            if (autresActivites == null)
            {
                return NotFound();
            }

            return View(autresActivites);
        }

        // POST: AutreActivités/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.AutresActivites == null)
            {
                return Problem("Entity set 'ApplicationDbContext.AutresActivites'  is null.");
            }
            var autresActivites = await _context.AutresActivites.FindAsync(id);
            if (autresActivites != null)
            {
                _context.AutresActivites.Remove(autresActivites);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AutresActivitesExists(int id)
        {
          return (_context.AutresActivites?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
