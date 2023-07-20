using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using BrainConciergerie.Models;
using BrainConciergerie.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

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
            return _context.Appartements != null ?
                Ok(await _context.Appartements.ToListAsync()) :
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

            var appart = await _context.Appartements
                .Include(a => a.Photos) // Charger les photos associées à l'appartement
                .FirstOrDefaultAsync(m => m.Id == id);

            if (appart == null)
            {
                return NotFound();
            }

            return Ok(appart);
        }
    }
}
