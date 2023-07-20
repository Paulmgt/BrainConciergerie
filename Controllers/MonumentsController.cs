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
    public class MonumentsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MonumentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Monuments
        public async Task<IActionResult> Index()
        {
              return _context.Monuments != null ? 
                          View(await _context.Monuments.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Monuments'  is null.");
        }

        // GET: Monuments/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Monuments == null)
            {
                return NotFound();
            }

            var monuments = await _context.Monuments
                .FirstOrDefaultAsync(m => m.Id == id);
            if (monuments == null)
            {
                return NotFound();
            }

            return View(monuments);
        }

        // GET: Monuments/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Monuments/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Localisation,Description,AppartsId")] Monuments monuments)
        {
            if (ModelState.IsValid)
            {
                _context.Add(monuments);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(monuments);
        }

        // GET: Monuments/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Monuments == null)
            {
                return NotFound();
            }

            var monuments = await _context.Monuments.FindAsync(id);
            if (monuments == null)
            {
                return NotFound();
            }
            return View(monuments);
        }

        // POST: Monuments/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Localisation,Description,AppartsId")] Monuments monuments)
        {
            if (id != monuments.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(monuments);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MonumentsExists(monuments.Id))
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
            return View(monuments);
        }

        // GET: Monuments/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Monuments == null)
            {
                return NotFound();
            }

            var monuments = await _context.Monuments
                .FirstOrDefaultAsync(m => m.Id == id);
            if (monuments == null)
            {
                return NotFound();
            }

            return View(monuments);
        }

        // POST: Monuments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Monuments == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Monuments'  is null.");
            }
            var monuments = await _context.Monuments.FindAsync(id);
            if (monuments != null)
            {
                _context.Monuments.Remove(monuments);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MonumentsExists(int id)
        {
          return (_context.Monuments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
