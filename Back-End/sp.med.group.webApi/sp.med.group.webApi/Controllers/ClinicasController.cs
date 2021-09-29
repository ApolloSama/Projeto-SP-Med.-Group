using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sp.med.group.webApi.Domains;
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
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository _clinicaRepository { get; set; }

        public ClinicasController()
        {
            _clinicaRepository = new ClinicaRepository();
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Clinica novaClinica)
        {
            _clinicaRepository.Cadastrar(novaClinica);

            return StatusCode(201);
        }

        [HttpGet("{idClinica}")]
        public IActionResult BuscarPorId(int idClinica)
        {
            return Ok(_clinicaRepository.BuscarPorId(idClinica));
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(_clinicaRepository.ListarTodas());
        }

        [HttpPut]
        public IActionResult Atualizar(Clinica clinicaAtualizada)
        {
            _clinicaRepository.Atualizar(clinicaAtualizada);

            return StatusCode(204);
        }

        [HttpDelete("{idClinica}")]
        public IActionResult Deletar(int idClinica)
        {
            _clinicaRepository.Deletar(idClinica);

            return StatusCode(204);
        }
    }
}
