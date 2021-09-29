using sp.med.group.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sp.med.group.webApi.Interfaces
{
    interface IClinicaRepository
    {
        /// <summary>
        /// Lista todas as clínicas 
        /// </summary>
        /// <returns>Uma lista de clínicas</returns>
        List<Clinica> ListarTodas();

        /// <summary>
        /// Busca um clínica através de um id
        /// </summary>
        /// <param name="id">id da clínica buscada</param>
        /// <returns>A clínica encontrada</returns>
        Clinica BuscarPorId(int id);

        /// <summary>
        /// Cadastra uma novaClinica 
        /// </summary>
        /// <param name="novaClinica">A clínica que será cadastrada</param>
        void Cadastrar(Clinica novaClinica);

        /// <summary>
        /// Atualiza uma clínica existente
        /// </summary>
        /// <param name="clinicaAtualizada">Uma clínica atualizada</param>
        void Atualizar(Clinica clinicaAtualizada);

        /// <summary>
        /// Deleta uma clínica através de um id
        /// </summary>
        /// <param name="id">id da clínica que será deletada</param>
        void Deletar(int id);
    }
}
