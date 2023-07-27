using BrainConciergerie.Data;
using BrainConciergerie.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace AppartsAppReactCs.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        [Route("Index")]
        [SwaggerOperation(Summary = "Get all appartements")]
        [SwaggerResponse(200, "Successful operation", typeof(IEnumerable<Appart>))]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> Index()
        {
            return _context.Apparts != null ?
                Ok(await _context.Apparts.ToListAsync()) :
                Problem("Entity set 'AppDbContext.Appartements' is null.");
        }

        [HttpGet]
        [Route("Details/{id}")]
        [SwaggerOperation(Summary = "Get an appartement by ID")]
        [SwaggerResponse(200, "Successful operation", typeof(Appart))]
        [SwaggerResponse(404, "Appartement not found")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var appart = await _context.Apparts
                .Include(a => a.Equipements)
                .Include(a => a.Monuments)
                .Include(a => a.Restaurants)
                .Include(a => a.Bars)
                .Include(a => a.Cinemas)
                .Include(a => a.Photos)
                .Include(a => a.AutresActivites)
                .Include(a => a.NotationsAppart)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (appart == null)
            {
                return NotFound();
            }

            // Load Photos into memory to calculate PhotoFileBase64
            var photos = appart.Photos.ToList();

            return Ok(appart);
        }


    }
}
