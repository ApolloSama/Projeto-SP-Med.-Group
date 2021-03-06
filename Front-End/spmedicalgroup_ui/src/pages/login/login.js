import { useState } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from "../../services/auth";
import { useHistory } from 'react-router-dom';

function App() {
    const [email, setEmail] = useState('')

    const [senha, setSenha] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    var history = useHistory()




    function fazerLogin(event) {

        event.preventDefault()

        setIsLoading(true)
        setErrorMsg('')

        axios.post('http://localhost:5000/api/Login', {

            Email: email,
            Senha: senha

        })
            .then((resposta) => {

                if (resposta.status === 200) {

                    localStorage.setItem('usuario-login', resposta.data.token)

                    if (parseJwt().role === '1') {
                        // history.push('/administrador');
                        console.log(`estou logado: ` + usuarioAutenticado());
                        history.push('/administrador');

                    } else if (parseJwt().role === '2') {
                        console.log(`estou logado: ` + usuarioAutenticado());
                        history.push('/medico');

                    }
                    else {
                        console.log(`estou logado: ` + usuarioAutenticado());
                        history.push('/paciente');

                    }

                    setIsLoading(false)

                }

            }).catch(() => {
                setErrorMsg('Email ou senha incorretos')
                setIsLoading(false)
            })

    }




    return (

        <div className="body_login">
            <div className="grid posix_login">
                <div className="bem_vindo_login">
                    <div className="img_medicos_login"></div>
                    <div className="msg_login">
                        <h1>SP Medical Group</h1>
                        <p>Fique tranquilo, nossa família de especialistas em saúde vai cuidar da
                            sua!
                        </p>
                    </div>
                </div>
                <div className="box_login">
                    <form action="" className="dados_login" onSubmit={ fazerLogin }>
                        <h1>Entre e seja bem-vindo!</h1>
                        <div className="inputs_login">
                            <input type="email" value={email} onChange={ (campo) => setEmail( campo.target.value ) } placeholder="E-mail" />
                            <input type="password" value={senha} onChange={ (campo) => setSenha( campo.target.value ) } placeholder="Senha" />
                            <p>{errorMsg}</p>
                            <button type="submit"
                                disabled={ isLoading ? true : false }
                            >Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
