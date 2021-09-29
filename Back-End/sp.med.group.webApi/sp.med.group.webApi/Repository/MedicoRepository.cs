using sp.med.group.webApi.Contexts;
using sp.med.group.webApi.Domains;
using sp.med.group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Repository
{
    public class MedicoRepository : IMedicoRepository
    {
        MedGroupContext ctx = new MedGroupContext();
        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.ToList();
        }
    }
}