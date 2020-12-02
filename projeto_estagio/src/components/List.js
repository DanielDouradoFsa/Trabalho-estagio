import React, { useState, useEffect } from 'react'
import "./List.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import BackupIcon from "@material-ui/icons/Backup";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import logo from "../assets/adm.png";
import Divider from "@material-ui/core/Divider";
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import axios from 'axios'
import { Link } from "react-router-dom";
export default (props) => {
    const { id } = JSON.parse(localStorage.getItem('UserData'))
    const initialList = {
        permission: [],
        idFuncionario: id,
    }
    const [list, setList] = useState(initialList)
    const setInput = (newValue) => {
        setList(list => ({ ...list, ...newValue }))
    }
    useEffect(async () => {
        const { idFuncionario } = list;
        const { data } = await axios.post('http://127.0.0.1:3333/returnPermission', { idFuncionario });
        var aux = []
        aux.push(data.gerir_bolsista);
        setInput({ permission: aux })
    }, []);
    const ComponentDidMount = async () => {
        const { data } = await axios.post('/returnPermission', list.idFuncionario);
        console.log(data)
        var aux = []
        aux.push(data.gerir_bolsista);
    }

    return (
        <div id='div_side'>
            <div id="side_content">
                <img
                    alt=''
                    id='logo_list'
                    src={logo}
                    className='d-inline-block align-top'
                />
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem
                        button
                        onClick={() => props.onClick("0")}
                        innerDivStyle={{ paddingLeft: 60 }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    {list.permission[0] == "1" && (
                        <ListItem button onClick={() => props.onClick("1")}>
                            <ListItemIcon>
                                <ImportContactsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gerenciar Usuários" />
                        </ListItem>
                    )}
                    <Link to="/" id="link_exit">
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Encerrar Sessão" href="login" />
                        </ListItem>
                    </Link>
                    {/* onClick={this.handleLogout} */}
                </List>
            </div>
        </div>
    )
}