using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using sp.med.group.webApi.Contexts;
using sp.med.group.webApi.Domains;
using sp.med.group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        MedGroupContext ctx = new MedGroupContext();

        //--------------------------------------------------------------------------------

        public void Atualizar(int idUsuario, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = ctx.Usuarios.Find(idUsuario);

            if (usuarioBuscado != null)
            {
                usuarioBuscado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;         
                usuarioBuscado.Email = usuarioAtualizado.Email;
                usuarioBuscado.Senha = usuarioAtualizado.Senha;

                ctx.Usuarios.Update(usuarioBuscado);
                ctx.SaveChanges();
            }
        }

        //--------------------------------------------------------------------------------

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.Include(u => u.IdTipoUsuarioNavigation).FirstOrDefault(e => e.IdUsuario == id);
        }

        //--------------------------------------------------------------------------------

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);
            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

        public string ConsultarPerfilBD(int IdUsuario)
        {
            ImagemUsuario imagemUsuario = new ImagemUsuario();

            imagemUsuario = ctx.ImagemUsuarios.FirstOrDefault(i => i.IdUsuario == IdUsuario);

            //Verificar se existe imagem de perfil para o usuario.
            if (imagemUsuario != null)
            {
                return Convert.ToBase64String(imagemUsuario.Binario);
            }

            return null;
        }

        //--------------------------------------------------------------------------------

        public void Deletar(int id)
        {
            ctx.Usuarios.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

        public List<Consulta> ListarMinhas(int idUsuario)
        {
            Usuario usuarioLogado = ctx.Usuarios.Find(idUsuario);

            //if (usuarioLogado.IdTipoUsuario == 2)
            //{
                //Medico medico = ctx.Medicos.FirstOrDefault(u => u.IdUsuario == idUsuario);

                //return ctx.Consultas.Include(m => m.IdMedicoNavigation).Include(m => m.IdSituacaoNavigation).Where(m => m.IdMedico == medico.IdMedico).ToList();
                return ctx.Consultas
                    //.Include(p => p.IdPacienteNavigation)
                    //.Include(p => p.IdMedicoNavigation)
                    //.Include(p => p.IdSituacaoNavigation)
                    .Select(c => new Consulta() { 
                        DataConsulta = c.DataConsulta, 
                        IdConsulta = c.IdConsulta, 
                        IdMedico = c.IdMedico, 
                        IdMedicoNavigation = new Medico()
                        {
                            IdMedico = c.IdMedico,
                            NomeMedico = c.IdMedicoNavigation.NomeMedico,
                            IdUsuario = c.IdMedicoNavigation.IdUsuario
                        },
                        IdPaciente = c.IdPaciente,
                        IdPacienteNavigation = new Paciente()
                        {
                            IdPaciente = c.IdPaciente,
                            NomePaciente = c.IdPacienteNavigation.NomePaciente,
                            IdUsuario = c.IdPacienteNavigation.IdUsuario
                        },
                        IdSituacao = c.IdSituacao,
                        IdSituacaoNavigation = new Situacao()
                        {
                            IdSituacao = c.IdSituacao,
                            NomeSituacao = c.IdSituacaoNavigation.NomeSituacao
                        },
                        Descricao = c.Descricao 
                    })
                    .Where(c => c.IdMedicoNavigation.IdUsuario == idUsuario || c.IdPacienteNavigation.IdUsuario == idUsuario)
                    .ToList();
                //return ctx.Consultas.Select(c => new Consulta() { DataConsulta = c.DataConsulta, IdConsulta = c.IdConsulta, IdMedico = c.IdMedico, IdPaciente = c.IdPaciente, IdSituacao = c.IdSituacao, Descricao = c.Descricao }).Where(m => m.IdMedico == medico.IdMedico).ToList();
            //}

            //else if (usuarioLogado.IdTipoUsuario == 3)
            //{
            //    Paciente paciente = ctx.Pacientes.FirstOrDefault(u => u.IdUsuario == idUsuario);

            //    return ctx.Consultas.Include(m => m.IdMedicoNavigation).Include(m => m.IdSituacaoNavigation).Where(m => m.IdPaciente == paciente.IdPaciente).ToList();
                //return ctx.Consultas.Select(c => new Consulta() { DataConsulta = c.DataConsulta, IdConsulta = c.IdConsulta, IdMedico = c.IdMedico, IdPaciente = c.IdPaciente, IdSituacao = c.IdSituacao, Descricao = c.Descricao }).Where(p => p.IdPaciente == paciente.IdPaciente).ToList();
            //}

            //else
            //{
            //    return null;
            //}           
        }

        //--------------------------------------------------------------------------------

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.Include(u => u.IdTipoUsuarioNavigation).ToList();
        }

        //--------------------------------------------------------------------------------

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(e => e.Email == email && e.Senha == senha);
        }

        //--------------------------------------------------------------------------------

        public void SalvarFotoBD(IFormFile foto, int idUsuario)
        {
            ImagemUsuario imagemUsuario = new ImagemUsuario();

            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);

                imagemUsuario.Binario = ms.ToArray();

                imagemUsuario.NomeArquivo = foto.FileName;

                imagemUsuario.MimeType = foto.FileName.Split(".").Last();

                imagemUsuario.IdUsuario = idUsuario;
            }

            ImagemUsuario imagemExistente = new ImagemUsuario();
            ctx.ImagemUsuarios.FirstOrDefault(i => i.IdUsuario == idUsuario);

            if (imagemExistente != null)
            {
                imagemExistente.Binario = imagemUsuario.Binario;
                imagemExistente.NomeArquivo = imagemUsuario.NomeArquivo;
                imagemExistente.MimeType = imagemUsuario.MimeType;
                imagemExistente.IdUsuario = imagemUsuario.IdUsuario;

                ctx.ImagemUsuarios.Update(imagemExistente);              
            }
            else
            {
                ctx.ImagemUsuarios.Add(imagemUsuario);
            }

            ctx.ImagemUsuarios.Add(imagemUsuario);

            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

    }
}