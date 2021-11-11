import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Usuarios() {

    const [ isLoading, setIsLoading] = useState( false ) 

    const [ listaUsuarios, setlistaUsuarios] = useState( [] )

    const [ titulo, setTitulo ] = useState( '' )

        function cadastrarUsuario(event) {
            setIsLoading( true )
            
            event.preventDefault()

            axios.post('http://localhost:5000/api/Usuarios', {
                headers: {
                    'Authorization' : 'Bearer' + localStorage.getItem('usuario-login')
                }
            }).then(response => {

                if (response.status === 200) {
                    console.log("Usuário Cadastrado Com sucesso!")

                    setTitulo ('')
                    setIsLoading(false)
                }

            }).catch( erro => console.log(erro), setTitulo(''), setIsLoading(false))
                
        }

        return (
            <div>
                <main>
                    <section>

                        <h1>Lista dos usuários</h1>

                        <div>
                            <table  classname="tabelaUsuarios" style={{ borderCollapse : 'separate', borderSpacing : 30 }}>
                                <tbody>
                                    {
                                        listaUsuarios.map( (usuario) => {
                                            return(
                                                <tr key={usuario.titulo}>
                                                    <td>{usuario.titulo}</td>
                                                </tr>
                                            )
                                        } ) 
                                    }
                                </tbody>
                            </table>
                        </div>

                    </section>

                    <section>
                        <h1>Cadastro de usuário</h1>

                        <form onSubmit={cadastrarUsuario}>
                            <div>
                                <input
                                 type="text"
                                 value={titulo}
                                 onChange={ (campo) => setTitulo(campop.target.value) }
                                 placeholder="Nome do usuário"
                                />

                            </div>
                        </form>
                    </section>
                </main>
            </div>
        )

}