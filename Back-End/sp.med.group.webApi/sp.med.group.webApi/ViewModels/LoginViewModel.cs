using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.ViewModels
{
    /// <summary>
    /// Classe responsável pelo modelo de login
    /// </summary>
    public class LoginViewModel // Ou DTO (Data Transfer Object)
    {
        [Required(ErrorMessage = "Informe o E-mail do usuário")]
        public string email { get; set; }

        [Required(ErrorMessage = "Informe a senha do usuário")]
        public string senha { get; set; }
    }
}
