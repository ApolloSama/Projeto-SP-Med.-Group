using sp.med.group.webApi.Contexts;
using sp.med.group.webApi.Domains;
using sp.med.group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Repository
{
    public class ClinicaRepository : IClinicaRepository
    {
        MedGroupContext ctx = new MedGroupContext();

        //--------------------------------------------------------------------------------

        public void Atualizar(Clinica clinicaAtualizada)
        {
            Clinica clinicaBuscada = ctx.Clinicas.Find(clinicaAtualizada.IdClinica);

            if (clinicaBuscada != null)
            {
                clinicaBuscada.IdClinica = clinicaAtualizada.IdClinica;
                clinicaBuscada.NomeFantasia = clinicaAtualizada.NomeFantasia;
                clinicaBuscada.RazaoSocial = clinicaAtualizada.RazaoSocial;
                clinicaBuscada.Endereco = clinicaAtualizada.Endereco;
                clinicaBuscada.Cnpj = clinicaAtualizada.Cnpj;
                clinicaBuscada.HorarioFunc = clinicaAtualizada.HorarioFunc;

                ctx.Clinicas.Update(clinicaBuscada);
                ctx.SaveChanges();
            }
        }

        //--------------------------------------------------------------------------------

        public Clinica BuscarPorId(int id)
        {
            return ctx.Clinicas.FirstOrDefault(e => e.IdClinica == id); ;
        }

        //--------------------------------------------------------------------------------

        public void Cadastrar(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);
            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

        public void Deletar(int id)
        {
            ctx.Clinicas.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        //--------------------------------------------------------------------------------

        public List<Clinica> ListarTodas()
        {
            return ctx.Clinicas.ToList();
        }

        //--------------------------------------------------------------------------------
    }
}