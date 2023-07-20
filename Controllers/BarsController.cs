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
    public class BarssController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BarssController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Barss
        public async Task<IActionResult> Index()
        {
              return _context.Bars != null ? 
                          View(await _context.Bars.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Bars'  is null.");
        }

        // GET: Barss/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Bars == null)
            {
                return NotFound();
            }

            var Bars = await _context.Bars
                .FirstOrDefaultAsync(m => m.Id == id);
            if (Bars == null)
            {
                return NotFound();
            }

            return View(Bars);
        }

        // GET: Barss/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Barss/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Localisation,Description,AppartsId")] Bars Bars)
        {
            if (ModelState.IsValid)
            {
                _context.Add(Bars);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(Bars);
        }

        // GET: Barss/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Bars == null)
            {
                return NotFound();
            }

            var Bars = await _context.Bars.FindAsync(id);
            if (Bars == null)
            {
                return NotFound();
            }
            return View(Bars);
        }

        // POST: Barss/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Localisation,Description,AppartsId")] Bars Bars)
        {
            if (id != Bars.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(Bars);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BarsExists(Bars.Id))
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
            return View(Bars);
        }

        // GET: Barss/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Bars == null)
            {
                return NotFound();
            }

            var Bars = await _context.Bars
                .FirstOrDefaultAsync(m => m.Id == id);
            if (Bars == null)
            {
                return NotFound();
            }

            return View(Bars);
        }

        // POST: Barss/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Bars == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Bars'  is null.");
            }
            var Bars = await _context.Bars.FindAsync(id);
            if (Bars != null)
            {
                _context.Bars.Remove(Bars);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BarsExists(int id)
        {
          return (_context.Bars?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
