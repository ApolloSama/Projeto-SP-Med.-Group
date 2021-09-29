using sp.med.group.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Interfaces
{
    interface IMedicoRepository
    {
        List<Medico> ListarTodos();
    }
}
