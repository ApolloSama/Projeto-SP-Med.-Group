import React from 'react'
import logo from '../assets/img/Group 1.png'
import { Link, useHistory } from 'react-router-dom';

import "../../src/assets/css/header.css"

export default function Header() {

    let history = useHistory();

    function LogOut() {

        localStorage.removeItem('usuario-login');
        history.push('/login');
        console.log("Logout efetuado com sucesso.")

    }




    return (
        <header className="header">

            <div className='logo_nome'>
                <img src={logo} alt="" className="logo_header" />
                <span>Sp. Medical Group</span>
            </div>
            <nav className="nav_header">
                <Link to={"../../src/pages/mapas"}>Localizações</Link>
                <a href="">Nossas Unidades</a>
                <a href="">Especialidades</a>
                <Link onClick={() => LogOut()}>Logout</Link>
            </nav>

        </header>
    )
}