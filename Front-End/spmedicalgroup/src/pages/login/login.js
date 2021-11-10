import { Component } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        senha: '',
        msgErro: '',
        isLoading: false,
      }

    }
      
}

fazerLogin = (event) => {

  event.preventDefault()

  this.setstate({msgErro: '', isLoading: true})

  axios.post('http://localhost:5000/api/Login', {
    email: this.state.email,
    senha: this.state.senha
  }).then ( (resposta) => {
    if (resposta.status === 200) {
      localStorage.setItem
    }
  })

  
}