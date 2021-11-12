import { useState } from 'react';
import axios from 'axios';


export default function Login() {
  const [email, setEmail] = useState('')

  const [senha, setSenha] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const [isLoading, setIsLoading] = useState(false)




  fazerLogin = (event) => {

    event.preventDefault()

    setIsLoading(true)
    setErrorMsg('')

    axios.post('http://localhost:5000/api/Login', {

      email: email,
      senha: senha

    }).then((resposta) => {

      if (resposta.status === 200) {

        localStorage.setItem('login-usuario', resposta.data.token)

        setIsLoading(false)

      }

    }).catch(() => {
      setErrorMsg('Email ou senha incorretos')
      setIsLoading(false)
    })

  }



  atualizaState = (campo) => {

    setSenha({ [campo.target.name]: [campo.target.value] })
  }





    return (

      <div>
        <main>
          <section>
            <form onSubmit={fazerLogin}>

              <div>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={atualizaState}
                  placeholder="nome do usuário"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="senha"
                  value={senha}
                  onChange={atualizaState}
                  placeholder="senha"
                />
              </div>

              <div>

                <p style={{ color: 'red' }}>{errorMsg}</p>

                isLoading === true && (
                <button type="submit" disabled>
                  Loading...
                </button>
                )

                isLoading === false && (
                <button
                  type="submit"
                  disabled={email === '' || senha === '' ?
                    'none' : ''}
                />
                )

              </div>

            </form>
          </section>
        </main>
      </div>

    )

  }
