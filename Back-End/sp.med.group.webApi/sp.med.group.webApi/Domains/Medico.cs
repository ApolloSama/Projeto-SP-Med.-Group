using System;
using System.Collections.Generic;

#nullable disable

namespace sp.med.group.webApi.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int IdMedico { get; set; }
        public int? IdUsuario { get; set; }
        public byte? IdEspecialidade { get; set; }
        public short? IdClinica { get; set; }
        public string Crm { get; set; }
        public string NomeMedico { get; set; }

        public virtual Clinica IdClinicaNavigation { get; set; }
        public virtual Especialidade IdEspecialidadeNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consulta> Consulta { get; set; }
    }
}
