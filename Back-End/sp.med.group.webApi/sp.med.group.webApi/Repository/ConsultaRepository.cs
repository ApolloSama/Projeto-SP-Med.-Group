using Microsoft.EntityFrameworkCore;
using sp.med.group.webApi.Contexts;
using sp.med.group.webApi.Domains;
using sp.med.group.webApi.Interfaces;
using sp.med.group.webApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Repository
{
    public class ConsultaRepository : IConsultaRepository
    {
        MedGroupContext ctx = new MedGroupContext();

        //--------------------------------------------------------------------------------

        public void AtualizarStatus(ConsultaViewModel consultaAtualizada)
        {
            Consulta consultaBuscada = ctx.Consultas.Find(consultaAtualizada.IdConsulta);

            if (consultaBuscada != null)
            {
                consultaBuscada.IdConsulta = consultaAtualizada.IdConsulta;
                consultaBuscada.IdSituacao = 1;
                consultaBuscada.Descricao = consultaAtualizada.Descricao;

                ctx.Consultas.Update(consultaBuscada);
                ctx.SaveChanges();
            }
        }

        //--------------------------------------------------------------------------------

        public void CancelarConsulta(int idConsulta)
        {
            Consulta consultaBuscada = ctx.Consultas.Find(idConsulta);

            if (consultaBuscada != null)
            {
                consultaBuscada.IdSituacao = 2;

                ctx.Consultas.Update(consultaBuscada);
                ctx.SaveChanges();
            }
        }

        //---------------------------------------------------------------------------------

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consultas.FirstOrDefault(e => e.IdConsulta == id); ;
        }

        //--------------------------------------------------------------------------------

        public void Cadastrar(Consulta novaConsulta)
        {
            novaConsulta.IdSituacao = 3;
            novaConsulta.Descricao = "O médico responsável pela consulta irá inserir uma descrição.";
            ctx.Consultas.Add(novaConsulta);
            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

        public void Deletar(int id)
        {
            ctx.Consultas.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

        public List<Consulta> ListarTodas()
        {
            return ctx.Consultas.Select(c => new Consulta() { IdPacienteNavigation = c.IdPacienteNavigation, IdMedicoNavigation = c.IdMedicoNavigation, IdSituacaoNavigation = c.IdSituacaoNavigation, DataConsulta = c.DataConsulta, Descricao = c.Descricao, IdConsulta = c.IdConsulta, IdMedico = c.IdMedico, IdPaciente = c.IdPaciente, IdSituacao = c.IdSituacao }).ToList();
            
            //return ctx.Consultas.ToList();

            //--------------------------------------------------------------------------------
        }
    }
}