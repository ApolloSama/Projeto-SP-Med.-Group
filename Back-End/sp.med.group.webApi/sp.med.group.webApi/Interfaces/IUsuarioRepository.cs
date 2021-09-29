using Microsoft.AspNetCore.Http;
using sp.med.group.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// Lista todos os usuários 
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        List<Usuario> ListarTodos();

        List<Consulta> ListarMinhas(int idUsuario);

        /// <summary>
        /// Busca um usuário através de um id
        /// </summary>
        /// <param name="id">id do usuário buscado</param>
        /// <returns>O usuário encontrado</returns>
        Usuario BuscarPorId(int id);

        /// <summary>
        /// Cadastra um novoUsuario 
        /// </summary>
        /// <param name="novoUsuario">O usuário que será cadastrado</param>
        void Cadastrar(Usuario novoUsuario);

        /// <summary>
        /// Atualiza um usuário existente
        /// </summary>
        /// <param name="usuarioAtualizado">Um usuário atualizado</param>
        /// <param name="idUsuario">Id do usuário que terá os dados atualizados</param>
        void Atualizar(int idUsuario, Usuario usuarioAtualizado);

        /// <summary>
        /// Deleta um usuário através de um id
        /// </summary>
        /// <param name="id">id do usuário que será deletado</param>
        void Deletar(int id);


        /// <summary>
        /// Autentica o usuario por meio de seu email e senha
        /// </summary>
        /// <param name="email">Email do usuario</param>
        /// <param name="senha">Senha do usuario</param>
        /// <returns>Um usuario autenticado, caso corresponda a um registro do BD </returns>
        Usuario Login(string email, string senha);

        void SalvarFotoBD(IFormFile foto, int idUsuario);

        string ConsultarPerfilBD(int IdUsuario);

    }
}
