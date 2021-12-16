import { useState } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from "../../services/auth";
import { useHistory } from 'react-router-dom';

import "../../assets/css/login.css"

export default function App() {
  const [email, setEmail] = useState('email1@gmail.com')

  const [senha, setSenha] = useState('senha1123')

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

          setIsLoading(false)

          let base64 = localStorage.getItem('usuario-login').split('.')[1]
          console.log(base64)

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


        }

      }).catch(() => {
        setErrorMsg('Email ou senha incorretos')
        setIsLoading(false)
      })

  }




  return (

    <div className="body_login">
      <div className="grid">
        <div className="conteudo_login">

          <div className="h1">
            <div className="msg_login">
              <h1>Bem vindo ao Sp. Medical Group!</h1>
            </div>
          </div>

            <form action="" className="dados_login grid" onSubmit={fazerLogin}>
                <input type="email"
                  value={email}
                  onChange={(campo) => setEmail(campo.target.value)}
                  placeholder="E-mail" />

                <input type="password"
                  value={senha}
                  onChange={(campo) => setSenha(campo.target.value)}
                  placeholder="Senha" />
                <p>{errorMsg}</p>

                <button type="submit" disabled={isLoading ? true : false}>Entrar</button>
            </form>

        </div>
      </div>
    </div>


  )
}
