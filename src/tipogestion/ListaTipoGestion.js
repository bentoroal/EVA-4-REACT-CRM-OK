import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaTipoGestion(){
    const [tipogestiones,setTipoGestiones] = useState([]);
    useEffect(() =>{
        const fetchTipoGestiones = async() =>{
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/tipo_gestion?_size=200');
                setTipoGestiones(response.data)
            } catch (error) {
                console.log(error)    
            }
        };
        fetchTipoGestiones();
    },[]);

    return(
        <div className= 'container'>
            <h1>Lista Tipos de Gestion</h1>
            <hr></hr>
            <div className="card">
            <div className="card-header">Lista de tipo de gestiones registradas</div>
            <div className="card-body">
            <a href="/tipogestion/agregar/" className="btn btn-primary">Nuevo Tipo de gestion</a>
            <hr></hr>
            <table className= 'table'>
                <thead>
                    <tr>
                    <th>ID</th>
                        <th>Nombre Tipo de Gestion</th>
                        <th>Fecha de registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tipogestiones.map((tipogestiones) => (
                        <tr>
                            <td> {tipogestiones.id_tipo_gestion}</td>
                            <td> {tipogestiones.nombre_tipo_gestion}</td>
                            <td> {tipogestiones.fecha_registro}</td>
                            <td> <Link to={`/tipogestion/eliminar/${tipogestiones.id_tipo_gestion}`} className="btn btn-danger">Eliminar</Link> </td>
                            <td> <Link to={`/tipogestion/actualizar/${tipogestiones.id_tipo_gestion}`} className="btn btn-warning">Actualizar</Link> </td>
                        </tr>
                      ) )  }    
                </tbody>
            </table>
            </div>
            </div>
        </div>
    )
}
export default ListaTipoGestion;