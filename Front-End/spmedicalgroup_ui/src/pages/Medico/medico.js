import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';

import "../../assets/css/medico.css"


export default function Medico() {

    const [listaConsultas, setListaConsultas] = useState([])

    const [idConsulta, setIdConsulta] = useState('')

    const [descricaoAtualizada, setDescricaoAtualizada] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    function buscarConsultas() {
        console.log('buscou as consultas')
        axios('http://localhost:5000/api/Usuarios/minhas',
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
            }
        )
            .then(response => {
                console.log(listaConsultas)
                if (response.status === 200) {
                    setListaConsultas(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };





    function atualizarConsulta(atualizacao) {

        setIsLoading(true);

        atualizacao.preventDefault();


        axios.patch('http://localhost:5000/api/Consultas/Descricao', { idConsulta: idConsulta, descricao: descricaoAtualizada, },
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
            }
        )
            .then(resposta => {
                if (resposta.status === 204) {
                    console.log("Descrição adicionada com sucesso!");
                    buscarConsultas();
                }

            })
            .catch(
                erro => console.log(erro, "Erro, algo de errado não está certo"), setIdConsulta(''),
                setDescricaoAtualizada(''), setIsLoading(false)
            );
    }




    useEffect(buscarConsultas, []);



    return (
        <div className="body_medico">
            <main>

                <section className="grid">
                    <form className="form_consulta" onSubmit={atualizarConsulta}>
                        <input
                            type="text"
                            name="idConsulta"
                            value={idConsulta}
                            onChange={campo => setIdConsulta(campo.target.value)}
                            placeholder="Id da Consulta"
                        />
                        <input
                            type="text"
                            name="desc"
                            value={descricaoAtualizada}
                            onChange={(campo) => setDescricaoAtualizada(campo.target.value)}
                            placeholder="Desc da consulta"
                        />
                        {isLoading && (
                            <button disabled className='btn' type='submit'>
                                Carregando...
                            </button>
                        )}
                        {!isLoading && (
                            <button className='btn' type='submit'>
                                Alterar
                            </button>
                        )}
                    </form>
                </section>

                <section className="grid">

                    <div className="conteudo_medico">
                        <table className="tabela_medico" style={{ borderCollapse: 'separate', borderSpacing: 30 }}>
                            <thead>
                                <tr>
                                    <th>Id Consulta</th>
                                    <th>Paciente</th>
                                    <th>Médico</th>
                                    <th>Situacão</th>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    listaConsultas.map((consulta) => {
                                        return (
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.idConsulta}</td>
                                                <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                                {/* <td>{consulta.idSituacaoNavigation.nomeSituacao}</td> */}
                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta))}</td>
                                                <td>{consulta.descricao}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                    </div>

                </section>
            </main>
        </div>
    )

}