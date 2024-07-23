import React , {createRef, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearTipoGestion(){
    
    const [nombre_tipo_gestion,setNombreTipoGestion] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fecha_registro = new Date().toISOString().slice(0,19).replace('T',' ');
            await axios.post('http://144.126.210.74:8080/api/tipo_gestion',{
                nombre_tipo_gestion,
                fecha_registro
            });
            navigate("/tipogestion");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("Se ha producido un error: " + error.response.statusText);
            }
        }
    }
 
    return(
        
        <div className="container">
        <h1>Agregar Tipo de gestion</h1>
        <hr></hr>
        {error &&(
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
        )
        }

        <div className="card">
            <div className="card-header">Complete los datos del nuevo tipo de gestion</div>
            <div className="card-body">
                    <form onSubmit={onSubmit} >
                        <div className="form-group">
                            <label>Nombre de tipo de gestion</label>
                            <input type="text" className="form-control" value={nombre_tipo_gestion} onChange={(e) => setNombreTipoGestion(e.target.value) }></input>
                        </div>
                        <hr></hr>
                        <button type="submit" className="btn btn-primary">Crear Tipo de gestion</button>
                    </form>
        </div>
        </div>
    </div>
)
}
export default CrearTipoGestion;