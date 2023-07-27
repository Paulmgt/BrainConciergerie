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
    public class PhotosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PhotosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoDTO>>> GetPhotos()
        {
            var photos = await _context.Photos.Include(p => p.Appart).ToListAsync();

            var photoDtos = photos.Select(photo => new PhotoDTO
            {
                Id = photo.Id,
                // assigner d'autres propriétés de la photo...

                AppartementId = photo.Appart.Id,
                PhotoFile = photo.PhotoFile,
                Nom = photo.Nom
                // assigner d'autres propriétés de l'appartement...
            }).ToList();

            return photoDtos;
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoDTO>> GetPhotos(int id)
        {
            var photo = await _context.Photos.Include(p => p.Appart).SingleOrDefaultAsync(p => p.Id == id);
            if (photo == null)
            {
                return NotFound();
            }

            var photoDto = new PhotoDTO
            {
                Id = photo.Id,
                // assigner d'autres propriétés de la photo...

                AppartementId = photo.Appart.Id,
                PhotoFile = photo.PhotoFile,
                Nom = photo.Nom
                // assigner d'autres propriétés de l'appartement...
            };

            return photoDto;
        }

        // PUT: api/Photos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhotos(int id, Photos photos)
        {
            if (id != photos.Id)
            {
                return BadRequest();
            }

            _context.Entry(photos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotosExists(id))
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

        // POST: api/Photos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Photos>> PostPhotos([FromForm] Photos photos, IFormFile photoFile)
        {
            if (_context.Photos == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Photos'  is null.");
            }

            // Vous pouvez également effectuer des vérifications supplémentaires sur le fichier ici (taille, type, etc.)

            // Sauvegarder le fichier
            if (photoFile != null && photoFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await photoFile.CopyToAsync(memoryStream);
                    photos.PhotoFile = memoryStream.ToArray();
                }
            }

            _context.Photos.Add(photos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhotos", new { id = photos.Id }, photos);
        }


        // DELETE: api/Photos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotos(int id)
        {
            if (_context.Photos == null)
            {
                return NotFound();
            }
            var photos = await _context.Photos.FindAsync(id);
            if (photos == null)
            {
                return NotFound();
            }

            _context.Photos.Remove(photos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhotosExists(int id)
        {
            return (_context.Photos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
