import React from 'react'
import './inicio.css';
import { Container, Jumbotron } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";

export default () => {
    return (
        <div>
            <Jumbotron fluid id="homeBegin">
                <Container>
                    <h1>Bem vindo, ao Sistema de Gerenciamento</h1>
                    <p id='frase'>"Tudo aquilo que o homem ignora, não existe para ele.
                            Por isso o universo de cada um, se resume no tamanho de seu saber."</p>
                    <p id="author">- Albert Einstein</p>
                </Container>
            </Jumbotron>
        </div>
    );
}