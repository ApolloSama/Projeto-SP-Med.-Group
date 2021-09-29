using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sp.med.group.webApi.Interfaces;
using sp.med.group.webApi.Repository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfisController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public PerfisController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [Authorize(Roles = "1,2,3")]
        [HttpPost("imagem/bd")]
        public IActionResult SalvarFotoBD(IFormFile arquivo)
        {
            try
            {
                if (arquivo.Length > 265820)

                    return BadRequest(new { mensagem = "Tamanho máximo excedido." });

                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png")

                    return BadRequest(new { mensagem = "Insira um arquivo .png" });

                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);


                _usuarioRepository.SalvarFotoBD(arquivo, idUsuario);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "1,2,3")]
        [HttpGet("imagem/bd")]
        public IActionResult ConsultarPerfilBD()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                string base64 = _usuarioRepository.ConsultarPerfilBD(idUsuario);

                return Ok(base64);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
