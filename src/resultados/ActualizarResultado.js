import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarResultado(){

    const [id_resultado,setIdResultado] = useState("");
    const [nombre_resultado,setNombreResultado] = useState("");
    

    let {id} = useParams();

    const navigate = useNavigate(); //Para redireccionar

    useEffect(() => {
        cargarDatosResultado();
    },[]);


    const cargarDatosResultado = async () => {
        try {//
            const response = await axios.get(`http://144.126.210.74:8080/api/resultado/${id}`);
            const resultado = response.data[0];
            setIdResultado(resultado.id_resultado)
            setNombreResultado(resultado.nombre_resultado);

        } catch (error) {
            console.log(error);
 
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault(); //permite que se ejecute cuando se realiza la accion(submit)
        try {
            const resultado = {
                nombre_resultado
            }
            await axios.patch(`http://144.126.210.74:8080/api/resultado/${id}`,resultado);

            navigate("/resultados");
        } catch (error) {
            console.log(error);
 
        }
    };

    return(
        <div className="container">
            <h1>Actualizar resultado</h1>
            <hr></hr>
            <div className="card">
                <div className="card-header">Complete los datos a actualizar</div>
                <div className="card-body">
                <form onSubmit={onSubmit} >
                
                        <div className="form-group">
                            <label>Id del resulado</label>
                            <input type="number" className="form-control" value={id_resultado} disabled ></input>
                        </div>
                        <div className="form-group">
                            <label>Nombre del resultado</label>
                            <input type="text" className="form-control" value={nombre_resultado} onChange={(e) => setNombreResultado(e.target.value) }></input>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Actualizar resultado</button>

                </form>
                </div>
            </div>
        </div>
    )
}

export default ActualizarResultado;