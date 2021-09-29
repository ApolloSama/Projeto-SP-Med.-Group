using System;
using System.Collections.Generic;

#nullable disable

namespace sp.med.group.webApi.Domains
{
    public partial class ImagemUsuario
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public byte[] Binario { get; set; }
        public string MimeType { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime DataInclusao { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
