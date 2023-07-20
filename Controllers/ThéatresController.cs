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
    public class CinemaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CinemaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Cinema
        public async Task<IActionResult> Index()
        {
              return _context.Cinema != null ? 
                          View(await _context.Cinema.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Cinema'  is null.");
        }

        // GET: Cinema/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Cinema == null)
            {
                return NotFound();
            }

            var Cinema = await _context.Cinema
                .FirstOrDefaultAsync(m => m.Id == id);
            if (Cinema == null)
            {
                return NotFound();
            }

            return View(Cinema);
        }

        // GET: Cinema/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Cinema/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Localisation,Description,AppartsId")] Cinema Cinema)
        {
            if (ModelState.IsValid)
            {
                _context.Add(Cinema);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(Cinema);
        }

        // GET: Cinema/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Cinema == null)
            {
                return NotFound();
            }

            var Cinema = await _context.Cinema.FindAsync(id);
            if (Cinema == null)
            {
                return NotFound();
            }
            return View(Cinema);
        }

        // POST: Cinema/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Localisation,Description,AppartsId")] Cinema Cinema)
        {
            if (id != Cinema.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(Cinema);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CinemaExists(Cinema.Id))
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
            return View(Cinema);
        }

        // GET: Cinema/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Cinema == null)
            {
                return NotFound();
            }

            var Cinema = await _context.Cinema
                .FirstOrDefaultAsync(m => m.Id == id);
            if (Cinema == null)
            {
                return NotFound();
            }

            return View(Cinema);
        }

        // POST: Cinema/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Cinema == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Cinema'  is null.");
            }
            var Cinema = await _context.Cinema.FindAsync(id);
            if (Cinema != null)
            {
                _context.Cinema.Remove(Cinema);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CinemaExists(int id)
        {
          return (_context.Cinema?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
