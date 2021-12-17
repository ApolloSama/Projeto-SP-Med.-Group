import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';

import Header from '../../components/header'
import Footer from '../../components/footer'

import "../../assets/css/paciente.css"



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
                console.log(response)
                if (response.status === 200) {
                    setListaConsultas(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };





    function atualizarConsulta(atualizacao) {

        setIsLoading(true);

        atualizacao.preventDefault();


        axios.patch('http://localhost:5000/api/Consultas/Descricao' + idConsulta, { resumo: descricaoAtualizada },
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
            }
        )
            .then(resposta => {
                if (resposta.status === 204) {
                    console.log("Resumo atualizado com sucesso!");
                    buscarConsultas();
                    //setIdDaConsulta(null);
                    //setDescricaoAtualizada('');
                    //setIsLoading(false);

                }

            })
            .catch(
                erro => console.log(erro, "DEU RUIM"), setIdConsulta(''),
                setDescricaoAtualizada(''), setIsLoading(false)
            );
    }




    useEffect(buscarConsultas, []);





    return (
        <div className="body_paciente">


            <main>
                <Header/>
                <section className="grid_paciente">

                    <div className="conteudo_paciente">
                        <table className="tabela_paciente" style={{ borderCollapse: 'separate', borderSpacing: 30 }}>
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

                                {
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
                                }

                            </tbody>
                        </table>

                    </div>

                    <Footer />
                </section>
            </main>

        </div>
    )

}