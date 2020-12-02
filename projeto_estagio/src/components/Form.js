import React, { useState } from 'react'
import './Form.css'
import {
    Button,
    Container,
    Form,
    FormControl,
    InputGroup,
} from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Grid } from '@material-ui/core';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TextField from "@material-ui/core/TextField";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import {history} from '../history.js'


export default () => {
    const initialFormState = {
        email: '',
        password: '',
        loading: '',
        error: ''
    }
    const [form, setForm] = useState(initialFormState)
    const setInput = (newValue) => {
        console.log(newValue)
        setForm(form => ({ ...form, ...newValue }))
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            //this.handleLogin(event);
            console.log("Fez Login")
        }
    };
    const handleLogin = async (event) => {
        setInput({ loading: true })
        event.preventDefault();
        const { email, password } = form;
        if (!email || !password) {
            setInput({ error: "Preencha e-mail e senha para continuar!" });
            setInput({ loading: false })
        } else {
          try {
            const response = axios.post('http://127.0.0.1:3333/login', {email, password})
            var valor= (await response).data
            localStorage.setItem('UserData',JSON.stringify(valor))
            if((await response).data.cargo==="Usuário"){
                history.push('/Usuario')
                //return <Redirect to={{pathname: `/adm`}} />;
            } else if((await response).data.cargo==="Empresa"){
                history.push('/Empresa')
            } else if((await response).data.cargo==="Adm"){ 
                history.push('/Usuario')
            }
          } catch (err) {
            setInput({
              error: "Problema no login, verifique suas credencias.",
            });
            setInput({ loading: false })
          }
        }
    };

    return (
        <div id="initial">
            <Container>
                <div>
                    <Paper id='form' elevation={4}>
                        <div>
                            <h1 id="title2">Login</h1>
                        </div>
                        <p id='erro'>{form.error}</p>
                        <Form id="info">
                            <div id="loginn">
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountBoxIcon style={{ fontSize: 33 }} />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="inputGridLogin"
                                            label="Usuário"
                                            value={form.email}
                                            onChange={e => setInput({ email: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div id="loginn">
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LockOpenIcon style={{ fontSize: 33 }} />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            id="inputGridPassword"
                                            label="Senha"
                                            type="password"
                                            value={form.password}
                                            onChange={e => setInput({ password: e.target.value })}
                                            onKeyPress={handleKeyPress}
                                        //onKeyPress={this.handleKeyPress}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Form>
                        <div
                            style={{
                                marginTop: "50px",
                            }}
                        >
                            {form.loading ? <CircularProgress /> :
                                <Button
                                    id="entrar"
                                    block
                                    variant="success"
                                    onClick={handleLogin}
                                    onKeyPress={handleKeyPress}
                                >
                                    Entrar
                                </Button>}
                            <Link to="/cadastro">
                                <Button
                                    id="cadastrar"
                                    block
                                    variant="secondary"
                                    type="submit"
                                    // onClick={history.push('/Cadastro')}
                                >
                                    Cadastre-se
                                </Button>
                            </Link>
                        </div>
                    </Paper>
                </div>
            </Container>
        </div>
    )
}