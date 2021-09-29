using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sp.med.group.webApi.Interfaces;
using sp.med.group.webApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository _pacienteRepository { get; set; }

        public PacientesController()
        {
            _pacienteRepository = new PacienteRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            return Ok(_pacienteRepository.ListarTodos());
        }
            
    }
}
