import React from 'react'

import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
import Login from './components/Form'
import Adm from './pages/Adm'
import Empresa from './pages/Empresa'
//import Login from './pages/Adm'
import Usuário from './pages/Usuario'
import {history} from './history'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/" />
            <Route component={Adm} exact path="/Adm" />
            <Route component={Empresa} exact path="/Empresa" />
            <Route component={Usuário} exact path="/Usuario" />
            {/* <Route component={Login} exact path="/Login" /> */}
        </Switch>
    </Router>
)

export default Routes