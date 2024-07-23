import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaResultados(){
    const [resultados,setResultados] = useState([]);
    useEffect(() =>{
        const fetchResultados = async() =>{
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/resultado?_size=200');
                setResultados(response.data)
            } catch (error) {
                console.log(error)    
            }
        };
        fetchResultados();
    },[]);

    return(
        <div className= 'container'>
            <h1>Lista de Resultados</h1>
            <hr></hr>
            <div className="card">
            <div className="card-header">Lista de Resultados registrados</div>
            <div className="card-body">
            <a href="/resultados/agregar/" className="btn btn-primary">Nuevo Resultado</a>
            <hr></hr>
            <table className= 'table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Resultado</th>
                        <th>Fecha de registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {resultados.map((resultados) => (
                        <tr>
                            <td> {resultados.id_resultado}</td>
                            <td> {resultados.nombre_resultado}</td>
                            <td> {resultados.fecha_registro}</td>
                            <td> <Link to={`/resultados/eliminar/${resultados.id_resultado}`} className="btn btn-danger">Eliminar</Link> </td>
                            <td> <Link to={`/resultados/actualizar/${resultados.id_resultado}`} className="btn btn-warning">Actualizar</Link> </td>
                        </tr>
                      ) )  }    
                </tbody>
            </table>
        </div>
        </div>
        </div>
    )
}
export default ListaResultados;