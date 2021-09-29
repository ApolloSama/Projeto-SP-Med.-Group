using sp.med.group.webApi.Domains;
using sp.med.group.webApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Interfaces
{
    interface IConsultaRepository
    {
        /// <summary>
        /// Lista todas as consultas 
        /// </summary>
        /// <returns>Uma lista de consultas</returns>
        List<Consulta> ListarTodas();

        /// <summary>
        /// Busca uma consulta através de um id
        /// </summary>
        /// <param name="id">id da consulta buscada</param>
        /// <returns>A consulta encontrada</returns>
        Consulta BuscarPorId(int id);

        /// <summary>
        /// Cadastra uma novaConsulta 
        /// </summary>
        /// <param name="novaConsulta">A consulta que será cadastrada</param>
        void Cadastrar(Consulta novaConsulta);

        /// <summary>
        /// Atualiza o status de uma consulta existente
        /// </summary>
        /// <param name="consultaAtualizada">Uma consulta Atualizada</param>
        void AtualizarStatus(ConsultaViewModel consultaAtualizada);

        /// <summary>
        /// Deleta uma consulta através de uma id
        /// </summary>
        /// <param name="id">id da consulta que será deletada</param>
        void Deletar(int id);
    }
}
