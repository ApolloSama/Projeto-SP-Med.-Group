using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sp.med.group.webApi.Domains;
using sp.med.group.webApi.Interfaces;
using sp.med.group.webApi.Repository;
using sp.med.group.webApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository _consultaRepository { get; set; }

        public ConsultasController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Consulta novaConsulta)
        {
            _consultaRepository.Cadastrar(novaConsulta);

            return StatusCode(201);
        }

        [Authorize(Roles = "1,2")]
        [HttpPatch("Descricao")]
        public IActionResult AtualizarStatus(ConsultaViewModel consultaAtualizada)
        {
            _consultaRepository.AtualizarStatus(consultaAtualizada);

            return StatusCode(204);
        }

        [HttpGet("{idUsuario}")]
        public IActionResult BuscarPorId(int idUsuario)
        {
            return Ok(_consultaRepository.BuscarPorId(idUsuario));
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(_consultaRepository.ListarTodas());
        }

        [HttpDelete("{idUsuario}")]
        public IActionResult Deletar(int idUsuario)
        {
            _consultaRepository.Deletar(idUsuario);

            return StatusCode(204);
        }
    }
}
