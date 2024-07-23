import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarTipoGestion(){

    const [id_tipo_gestion,setIdTipoGestion] = useState("");
    const [nombre_tipo_gestion,setNombreTipoGestion] = useState("");
    

    let {id} = useParams();

    const navigate = useNavigate(); //Para redireccionar

    useEffect(() => {
        cargarDatosTipoGestion();
    },[]);


    const cargarDatosTipoGestion = async () => {
        try {//
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            const tipo_gestion = response.data[0];
            setIdTipoGestion(tipo_gestion.id_tipo_gestion)
            setNombreTipoGestion(tipo_gestion.nombre_tipo_gestion);

        } catch (error) {
            console.log(error);
 
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault(); //permite que se ejecute cuando se realiza la accion(submit)
        try {
            const tipo_gestion = {
                nombre_tipo_gestion
            }
            await axios.patch(`http://144.126.210.74:8080/api/tipo_gestion/${id}`,tipo_gestion);

            navigate("/tipogestion");
        } catch (error) {
            console.log(error);
 
        }
    };

    return(
        <div className="container">
            <h1>Actualizar tipo de gestion</h1>
            <hr></hr>
            <div className="card">
                <div className="card-header">Complete los datos a actualizar</div>
                <div className="card-body">
                <form onSubmit={onSubmit} >
                
                        <div className="form-group">
                            <label>Id del resulado</label>
                            <input type="number" className="form-control" value={id_tipo_gestion} disabled ></input>
                        </div>
                        <div className="form-group">
                            <label>Nombre del tipo de gestion</label>
                            <input type="text" className="form-control" value={nombre_tipo_gestion} onChange={(e) => setNombreTipoGestion(e.target.value) }></input>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Actualizar tipo de gestion</button>

                </form>
                </div>
            </div>
        </div>
    )
}

export default ActualizarTipoGestion;