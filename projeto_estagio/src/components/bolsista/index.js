import React, { useState, useEffect } from 'react'
import {
    Row,
    Col,
    Container,
    Button,
    Dropdown,
    InputGroup,
    FormControl,
    Table,
    Modal,
} from "react-bootstrap";
import CadastroBolsista from "../form_bolsista";
import DeleteIcon from "@material-ui/icons/Delete";
import { Alert, AlertTitle } from "@material-ui/lab";
//import api from "../../services/api";
//import CadastroBolsista from "./form_bolsista";
import SearchIcon from "@material-ui/icons/Search";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import SweetAlert from "sweetalert2-react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
export default () => {
    const initialFormState = {
        search: "",
        show: false,
        showdelete: false,
        controlCancel1: false,
        bolsistas: [],
        searchControl: false,
        controlCancel: false,
        deleteSelected: "",
        bolsistasReserva: [],
        loading: true
    }
    const bolsistas = [
        { idPessoa: 90, nome: "Gustavo", telefone: "11223366554", email: "gustavomendes_fsa@hotmail.com", intaivo: 0 },
        { idPessoa: 95, nome: "Lucas", telefone: "169982182328", email: "kikulolo9@gmail.com", intaivo: 0 },
        { idPessoa: 97, nome: "Erica", telefone: "75988398927", email: "ericamaia1980@hotmail.com", intaivo: 0 },
        { idPessoa: 101, nome: "Jorgina", telefone: "74988625042", email: "jorginamendes02@hotmail.com", intaivo: 0 },
        { idPessoa: 103, nome: "Roberto", telefone: "758484845121", email: "asoia9suii9as@gmail.com", intaivo: 0 }
    ]
    const [bolsista, setBolsista] = useState(bolsistas)
    const setBolsis = (newValue) => {
        setBolsista(bolsista => ({ ...bolsista, ...newValue }))
    }
    const [form, setForm] = useState(initialFormState)
    const setInput = (newValue) => {
        setForm(form => ({ ...form, ...newValue }))
    }

    useEffect(async () => {
        //const {data} = await Axios.post("http://127.0.0.1:3333/listarBolsistas");
        const data = bolsista
        setInput({ bolsistas: data.map((b) => b) })
        setInput({ bolsistasReserva: data.map((b) => b) })
        setInput({ loading: false })
    }, []);
    const deleteItem = () => {
        var id = form.deleteSelected;
        var newList = form.bolsistas.filter((obj) => obj.idPessoa !== id);
        var newList2 = form.bolsistasReserva.filter(
            (obj) => obj.idPessoa !== id
        );
        setInput({ bolsistas: newList, bolsistasReserva: newList2 });
        var removido = form.bolsistas.filter((obj) => obj.idPessoa === id);
        setInput({ showdelete: true });
        console.log("Esse cara foi removido: ", removido)
        //api.post("/removerBolsista", removido);
    };
    /** NOTE Método para abrir o modal */
    const setControl = () => setInput({ show: true });
    const setControlCancel = (id) => {
        setInput({ controlCancel: true, deleteSelected: id });
    }

    /**NOTE Método para fechar o modal */
    const handleClose = () => setInput({ show: false });
    const orderNameCresc = () => {
        var newList = form.bolsistas;
        newList.sort((a, b) => (a.nome > b.nome ? 1 : -1));
        setInput({ bolsistas: newList });
        setInput({ orderN: true });
    };

    const orderNameDecresc = () => {
        var newList = form.bolsistas;
        newList.sort((a, b) => (a.nome > b.nome ? -1 : 1));
        setInput({ bolsistas: newList });
        setInput({ orderN: false });
    };

    const orderEmailCresc = () => {
        var newList = form.bolsistas;

        newList.sort((a, b) => (a.email > b.email ? 1 : -1));
        setInput({ bolsistas: newList });
        setInput({ orderE: true });
    };
    const orderEmailDecresc = () => {
        var newList = form.bolsistas;
        newList.sort((a, b) => (a.email > b.email ? -1 : 1));
        setInput({ bolsistas: newList });
        setInput({ orderE: false });
    };
    const handleChange = (event) => {
        setInput({ search: event.target.value });
        let newList = [];
        let bolsistas = form.bolsistasReserva;
        if (event.target.value !== "") {
            newList = bolsistas.filter((item) => {
                var lcname = item.nome.toLowerCase();
                var lcemail = item.email.toLowerCase();
                var value = event.target.value.toLowerCase();
                setInput({ searchControl: true });
                return (
                    lcname.includes(value) ||
                    lcemail.includes(value) ||
                    item.telefone.includes(value)
                );
            });
        }
        if (event.target.value === "") {
            newList = bolsistas;
            setInput({ searchControl: false });
        }
        setInput({ bolsistas: newList });
    };
    const handleSearch = () => {
        let newList = [];
        let bolsistas = form.bolsistasReserva;
        if (form.search !== "") {
            newList = bolsistas.filter((item) => {
                var lcname = item.nome.toLowerCase();
                var lcemail = item.email.toLowerCase();
                var value = form.search.toLowerCase();
                setInput({ searchControl: true });
                return (
                    lcname.includes(value) ||
                    lcemail.includes(value) ||
                    item.telefone.includes(value)
                );
            });
        }
        if (form.search === "") {
            newList = bolsistas;
            setInput({ searchControl: false });
        }
        setInput({ bolsistas: newList });
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    const loading = form.loading;
    return (
        <div>
            <SweetAlert
                show={form.showdelete}
                title="Sucesso"
                text="O bolsistas foi removido"
                onConfirm={() =>
                    setInput({ showdelete: false, controlCancel: false })
                }
            />
            <Modal
                show={form.controlCancel}
                onHide={() => setInput({ controlCancel: false })}
                aria-labelledby="example-modal-sizes-title-lg"
                id="modal"
            >
                <Modal.Header closeButton id="header">
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Tem certeza que deseja excluir o bolsista?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="outline-danger"
                        id="cancel2"
                        onClick={() => deleteItem()}
                    >
                        Excluir bolsista
                    </Button>
                </Modal.Body>
            </Modal>
            <Container fluid>
                <Row>
                    <Col>
                        <h3 style={{ textAlign: "left", marginTop: "15px" }}>
                            Gerenciar Usuários
                        </h3>
                    </Col>
                    <Col></Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-primary">
                                Ordenar Por
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={orderNameCresc}>
                                    Nome
                                </Dropdown.Item>
                                <Dropdown.Item onClick={orderEmailCresc}>
                                    Email
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col></Col>
                    <Col>
                        <InputGroup>
                            <FormControl
                                placeholder="Procurar..."
                                value={form.search}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                            />
                            <InputGroup.Prepend>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={handleSearch}
                                >
                                    <SearchIcon size="small" />
                                </Button>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <div style={{ height: "3vh" }}></div>
                </Row>
                <Row
                    style={{
                        height: "40vh",
                        overflowY: "auto",
                    }}
                >
                    <Col md={11}>
                        <div>
                            {loading ? <CircularProgress /> :
                                <Table striped bordered hover responsive size="md">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>
                                                Nome{" "}
                                                <IconButton aria-label="delete" size="small">
                                                    <ExpandMoreIcon onClick={orderNameCresc} />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="small">
                                                    <ExpandLessIcon onClick={orderNameDecresc} />
                                                </IconButton>
                                            </th>
                                            <th>
                                                Email{" "}
                                                <IconButton aria-label="delete" size="small">
                                                    <ExpandMoreIcon onClick={orderEmailCresc} />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="small">
                                                    <ExpandLessIcon onClick={orderEmailDecresc} />
                                                </IconButton>
                                            </th>
                                            <th>Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {form.bolsistas.map((b, i = 0) => (
                                            <tr key={b.idPessoa} name={b.idPessoa}>
                                                <td>
                                                    <b>{i++}</b>
                                                </td>
                                                <td>{b.nome}</td>
                                                <td>{b.email}</td>
                                                <td>{b.telefone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>}
                        </div>
                    </Col>
                    <Col
                        md={1}
                        style={{
                            paddingTop: "45px",
                        }}
                    >
                        {form.bolsistas.map((b) => (
                            <Row style={{ paddingTop: "14px" }}>
                                <Button
                                    size="sm"
                                    variant="outline-danger"
                                    onClick={() => setControlCancel(b.idPessoa)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </Row>
                        ))}
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={5}>
                        {form.bolsistas.length === 0 &&
                            form.searchControl === false && form.loading === false && (
                                <Alert
                                    severity="warning"
                                    variant="filled"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                >
                                    <AlertTitle>
                                        <b>Ainda não há bolsistas cadastrados no sistema </b>
                                    </AlertTitle>
                                </Alert>
                            )}
                    </Col>
                    <Col xs={2}></Col>
                    <Col xs={2}>
                        <Button variant="primary" block onClick={setControl}>
                            Novo Cadastro
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={form.show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Bolsista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CadastroBolsista />
                </Modal.Body>
            </Modal>
        </div>
    )
}