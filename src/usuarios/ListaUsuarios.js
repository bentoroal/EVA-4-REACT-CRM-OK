import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaUsuarios(){
    const [usuarios,setUsuarios] = useState([]);
    useEffect(() =>{
        const fetchUsuarios = async() =>{
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/usuario?_size=200');
                setUsuarios(response.data)
            } catch (error) {
                console.log(error)    
            }
        };
        fetchUsuarios();
    },[]);

    return(
        <div className= 'container'>
            <h1>Lista de Usuarios</h1>
            <hr></hr>
            <div className="card">
            <div className="card-header">Lista de usuarios registrados</div>
            <div className="card-body">
            <a href="/usuarios/agregar/" className="btn btn-primary">Nuevo Usuario</a>
            <hr></hr>
            <table className= 'table'>
                <thead>
                    <th>RUT</th>
                    <th>DV</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>Nombre de usuario</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr>
                            <td> {usuario.id_usuario}</td>
                            <td> {usuario.dv}</td>
                            <td> {usuario.nombres}</td>
                            <td> {usuario.apellidos}</td>
                            <td> {usuario.email}</td>
                            <td> {usuario.celular}</td>
                            <td> {usuario.username}</td>
                            <td> <Link to={`/usuarios/eliminar/${usuario.id_usuario}`} className="btn btn-danger">Eliminar</Link> </td>
                            <td> <Link to={`/usuarios/actualizar/${usuario.id_usuario}`} className="btn btn-warning">Actualizar</Link> </td>
                        </tr>
                      ) )  }    
                </tbody>
            </table>
            </div>
            </div>
        </div>
    )
}
export default ListaUsuarios;