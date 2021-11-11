import { Component, useState } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState( '' )

  const [senha, setSenha] = useState( '' )

  const [errorMsg, setErrorMsg] = useState( '' )

  const [isLoading, setIsLoading] = useState( false )
}


fazerLogin = (event) => {

  event.preventDefault()
  
  setIsLoading(true)
  setErrorMsg( '' )

  axios.post('http://localhost:5000/api/Login', {
    
    email: email,
    senha: senha

  }).then ( (resposta) => {

    if (resposta.status === 200) {

      localStorage.setItem('login-usuario', resposta.data.token)

      setIsLoading( false )

    }

  }).catch(() => {
    setErrorMsg('Email ou senha incorretos')
    setIsLoading(false)
  })

}

atualizaState = (campo) => {

  setSenha({ [campo.target.name] : [campo.target.value]} )
}