using Microsoft.AspNetCore.Mvc;
using site_igreja_core_mvc.Models;
using System.Diagnostics;

namespace site_igreja_core_mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View(true);
        }

        public IActionResult Sobre()
        {
            return View(false);
        }

        public IActionResult Contactos()
        {
            return View(false);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}