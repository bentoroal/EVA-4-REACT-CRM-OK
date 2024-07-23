import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaGestiones(){
    const [gestiones,setGestiones] = useState([])
    useEffect(() =>{
        const fetchGestiones = async() =>{
            try {
                const response = await axios.post('http://144.126.210.74:8080/dynamic',{"query": "select ges.id_gestion as id_gestion,cli.id_cliente, ges.comentarios as comentarios,CONCAT(cli.nombres, ' ',cli.apellidos) as nombre_cliente, CONCAT(usu.nombres,' ' ,usu.apellidos) as nombre_usuario,tge.nombre_tipo_gestion as nombre_tipo_gestion,res.nombre_resultado as nombre_resultado,ges.fecha_registro as fecha_registro from gestion ges,usuario usu,cliente cli,tipo_gestion tge,resultado res where ges.id_usuario = usu.id_usuario and ges.id_cliente = cli.id_cliente and ges.id_tipo_gestion = tge.id_tipo_gestion and ges.id_resultado = res.id_resultado "
            });
                setGestiones(response.data)
            } catch (error) {
                console.log(error)    
            }
        };
        fetchGestiones();
    },[]);

    return(
        <div className= 'container'>
            <h1>Lista de Gestiones</h1>
            <hr></hr>
            <div className="card">
            <div className="card-header">Lista de gestiones registradas</div>
            <div className="card-body">
            <a href="/gestiones/agregar/" className="btn btn-primary">Nueva Gestion</a>
            <hr></hr>
            <table className= 'table'>
                <thead>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Cliente</th>
                    <th>Tipo de gestión</th>
                    <th>Resultado</th>
                    <th>Comentarios</th>
                    <th>Fecha de ingreso</th>   
                    <th>Opciones</th>
                </thead>
                <tbody>
                    {gestiones.map((gestion) => (
                        <tr>
                            <td>{gestion.id_gestion}</td>
                            <td>{gestion.nombre_usuario}</td>
                            <td>{gestion.nombre_cliente}</td>
                            <td>{gestion.nombre_tipo_gestion}</td>
                            <td>{gestion.nombre_resultado}</td>
                            <td>{gestion.comentarios}</td>
                            <td>{gestion.fecha_registro}</td>
                            <td> <Link to={`/gestiones/eliminar/${gestion.id_gestion}`} className="btn btn-danger">Eliminar</Link> </td>
                            <td> <Link to={`/gestiones/actualizar/${gestion.id_gestion}`} className="btn btn-warning">Actualizar</Link> </td>
                        </tr>
                      ) )  }    
                </tbody>
            </table>
            </div>
            </div>
        </div>
    )
}
export default ListaGestiones;