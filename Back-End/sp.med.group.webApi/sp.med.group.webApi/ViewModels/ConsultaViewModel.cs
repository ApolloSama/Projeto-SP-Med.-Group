using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.ViewModels
{
    public class ConsultaViewModel // DTO (Data Transfer Object)
    {
        public int IdConsulta { get; set; }
        public byte IdSituacao { get; set; }
        public string Descricao { get; set; }
    }
}
