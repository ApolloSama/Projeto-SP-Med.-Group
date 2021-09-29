using Microsoft.EntityFrameworkCore;
using sp.med.group.webApi.Contexts;
using sp.med.group.webApi.Domains;
using sp.med.group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Repository
{
    public class PacienteRepository : IPacienteRepository
    {
        MedGroupContext ctx = new MedGroupContext();

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes.ToList();
        }
    }
}