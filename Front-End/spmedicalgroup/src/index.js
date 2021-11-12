import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';

import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import Login from "./pages/login/login"
import NotFound from "./pages/notFound/notFound"


const PermissaoMedico = ({ component: Component }) => (
  <Route
   render={ (props) =>
    usuarioAutenticado() && parseJwt().role === "2" ?
     ( <Component {...props}/>) : 
     (<Redirect to="login"/>)
  }
  />
)

const PermissaoPaciente = ({ component: Component }) => (
  <Route
   render={ (props) =>
    usuarioAutenticado() && parseJwt().role === "3" ?
     ( <Component {...props}/>) : 
     (<Redirect to="login"/>)
  }
  />
)

const routing= (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/notFound" component={NotFound} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
