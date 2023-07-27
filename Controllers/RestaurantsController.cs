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
    public class RestaurantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RestaurantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Restaurants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestaurantsDTO>>> GetRestaurants()
        {
            if (_context.Restaurants == null)
            {
                return NotFound();
            }

            var restaurants = await _context.Restaurants.ToListAsync();

            var restaurantsDTOs = restaurants.Select(r => new RestaurantsDTO
            {
                Id = r.Id,
                Nom = r.Nom,
                Localisation = r.Localisation,
                Description = r.Description,
                AppartementId = r.AppartId,
            }).ToList();

            return restaurantsDTOs;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantsDTO>> GetRestaurants(int id)
        {
            if (_context.Restaurants == null)
            {
                return NotFound();
            }

            var restaurant = await _context.Restaurants.FindAsync(id);

            if (restaurant == null)
            {
                return NotFound();
            }

            var restaurantDTO = new RestaurantsDTO
            {
                Id = restaurant.Id,
                Nom = restaurant.Nom,
                Localisation = restaurant.Localisation,
                Description = restaurant.Description,
                AppartementId = restaurant.AppartId,
            };

            return restaurantDTO;
        }


        // PUT: api/Restaurants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurants(int id, Restaurants restaurants)
        {
            if (id != restaurants.Id)
            {
                return BadRequest();
            }

            _context.Entry(restaurants).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestaurantsExists(id))
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

        // POST: api/Restaurants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Restaurants>> PostRestaurants(Restaurants restaurants)
        {
          if (_context.Restaurants == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Restaurants'  is null.");
          }
            _context.Restaurants.Add(restaurants);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRestaurants", new { id = restaurants.Id }, restaurants);
        }

        // DELETE: api/Restaurants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurants(int id)
        {
            if (_context.Restaurants == null)
            {
                return NotFound();
            }
            var restaurants = await _context.Restaurants.FindAsync(id);
            if (restaurants == null)
            {
                return NotFound();
            }

            _context.Restaurants.Remove(restaurants);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RestaurantsExists(int id)
        {
            return (_context.Restaurants?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("{appartementId}/restaurants")]
        public async Task<ActionResult<IEnumerable<RestaurantsDTO>>> GetRestaurantsByAppartementId(int appartementId)
        {
            var restaurants = await _context.Restaurants
                .Where(r => r.Appart.Id == appartementId)
                .Select(r => new RestaurantsDTO
                {
                    Id = r.Id,
                    Nom = r.Nom,
                    Localisation = r.Localisation,
                    Description = r.Description,
                    AppartementId = r.Appart.Id,
                })
                .ToListAsync();

            if (!restaurants.Any())
            {
                return NotFound();
            }

            return restaurants;
        }


    }
}
