import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';

import "../../assets/css/admin.css"


export default function Administrador() {

    const [listaConsultas, setListaConsultas] = useState([]);

    const [idPaciente, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [listaPacientes, setListaPacientes] = useState([])
    const [listaMedicos, setListaMedicos] = useState([])
    const [dataConsulta, setDataConsulta] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);





    function buscarConsultas() {
        axios
            ('http://localhost:5000/api/Consultas',
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
                }
            )
            .then(response => {
                if (response.status === 200) {
                    setListaConsultas(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };





    function cadastrarConsulta(novaConsulta) {

        setIsLoading(true);

        novaConsulta.preventDefault();


        let consulta = {
            idPaciente: idPaciente,
            dataHorario: dataConsulta,
            idMedico: idMedico
        };


        axios.post('http://localhost:5000/api/Consultas', consulta,
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
            }
        )
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log("Sua consulta foi cadastrada!");
                    setDataConsulta(new Date());
                    setIdPaciente(0);
                    setIdMedico(0);
                    buscarConsultas();
                    setIsLoading(false);
                    window.location.reload();
                }
            })
            .catch(
                erro => console.log(erro, "Algo de errado não está certo"), setDataConsulta(),
                setIdPaciente(0), setIdMedico(0), setIsLoading(false)
            );
    }


    function buscarMedicos() {
        axios
            ('http://localhost:5000/api/Medicos',
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
                }
            )
            .then(response => {
                if (response.status === 200) {
                    setListaMedicos(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };


    function buscarPacientes() {
        axios
            ('http://localhost:5000/api/Pacientes',
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
                }
            )
            .then(response => {
                if (response.status === 200) {
                    setListaPacientes(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };




    useEffect(buscarConsultas, []);
    useEffect(buscarPacientes, []);
    useEffect(buscarMedicos, []);



    return (
        <div className="body_admin">

            <div className="box_cadastro grid">
                <section className="conteudo_cadastro">
                    <div className="teste">
                        <h2>Cadastrar Consulta</h2>

                        <div className="form_admin">
                            <form onSubmit={cadastrarConsulta}>
                                <div className="inputs">
                                    <select
                                        name="paciente"
                                        value={idPaciente}
                                        onChange={(campo) => setIdPaciente(campo.target.value)}
                                    >
                                        <option value="0">Selecione o paciente:</option>
                                        {
                                            listaPacientes.map((paciente) => {
                                                return (
                                                    <option
                                                        key={paciente.idPaciente}
                                                        value={paciente.idPaciente}
                                                    >
                                                        {paciente.nomeCompleto}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>

                                    <select
                                        name="medico"
                                        value={idMedico}
                                        onChange={(campo) => setIdMedico(campo.target.value)}
                                    >
                                        <option value="0">Selecione o medico:</option>
                                        {
                                            listaMedicos.map((medico) => {
                                                return (
                                                    <option
                                                        key={medico.idMedico}
                                                        value={medico.idMedico}
                                                    >
                                                        {medico.nomeCompleto}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>

                                    <input type="datetime-local" name="dataConsulta" value={dataConsulta} onChange={(campo) => setDataConsulta(campo.target.value)} />
                                </div>

                                <button type="submit">Cadastrar</button>



                            </form>


                        </div>


                    </div>

                    <div className="conteudo_admin">
                        <table className="tabela_admin" style={{ borderCollapse: 'separate', borderSpacing: 30 }}>
                            <thead>
                                <tr>
                                    <th>Paciente</th>
                                    <th>Médico</th>
                                    <th>Situacão</th>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>

                            <tbody>

                                {/* {
                                    listaConsultas.map((consulta) => {
                                        return (
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                                <td>{consulta.idSituacaoNavigation.nomeSituacao}</td>
                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta))}</td>
                                                <td>{consulta.descricao}</td>
                                            </tr>
                                        )
                                    })
                                } */}

                            </tbody>
                        </table>
                    </div>

                </section>
            </div>

        </div>
    )

}