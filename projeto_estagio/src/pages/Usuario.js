import React, { useState } from 'react'
import "./Usuario.css";
import Inicio from '../components/Inicio'
import Bolsista from '../components/bolsista/index'
//import Bolsista from '../components/Inicio'
import { Container, Row, Col, Nav } from "react-bootstrap";
import SimpleList from '../components/List'
//onChange={e => setInput({ email: e.target.value })}
export default () => {
    const {id} = JSON.parse(localStorage.getItem('UserData'))
    console.log(id)
    const initialState = {
        screens: [
            <Inicio></Inicio>,
            <Bolsista></Bolsista>
        ],
        idFuncionario: id,
        permission: [],
        active: null
    }
    const [form, setForm] = useState(initialState)
    const setInput = (newValue) => {
        setForm(form => ({ ...form, ...newValue }))
    }
    const componentDidMount = screen => {
        screen == null
            ? setInput({ active: form.screens[0] })
            : setInput({ active: form.screens[screen] });
    };

    return (
        <div id='div_user'>
            <Container
                fluid
                style={{
                    peddingLeft: 0
                }}
            >
                <Row>
                    <Col md={12}></Col>
                </Row>
                <Row></Row>
                <div id="div_sidearea">
                     <div id="div_sidebar">
                         <SimpleList
                            screens={form.screens}
                            onClick={componentDidMount}
                            permission={form.idFuncionario}
                        /> 
                    </div>
                    <Container fluid>
                        <div id="div_screen">
                            {form.active}
                        </div>
                    </Container>
                </div>
            </Container>
        </div>
    )
}