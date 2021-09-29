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
                consultaBuscada.IdSituacao = consultaAtualizada.IdSituacao;
                consultaBuscada.Descricao = consultaAtualizada.Descricao;

                ctx.Consultas.Update(consultaBuscada);
                ctx.SaveChanges();
            }
        }

        //--------------------------------------------------------------------------------

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consultas.FirstOrDefault(e => e.IdConsulta == id); ;
        }

        //--------------------------------------------------------------------------------

        public void Cadastrar(Consulta novaConsulta)
        {
            novaConsulta.IdSituacao = 2;
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
            return ctx.Consultas.ToList();
        }

        //--------------------------------------------------------------------------------
    }
}