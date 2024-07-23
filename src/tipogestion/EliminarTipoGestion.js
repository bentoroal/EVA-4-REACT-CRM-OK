import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";//useParams para tomar parametros de la ruta para eliminar por id
 
function EliminarTipoGestion(){
    const navigate = useNavigate();
    const [tipogestion,setTipoGestion] = useState([]);
    const [error,setError] = useState("");
 
    let {id} = useParams();
 
    useEffect(() => {
        cargarDatosTipoGestion();
    },[]);
 
    const cargarDatosTipoGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            setTipoGestion(response.data[0]);
        } catch (error) {
            console.log(error);
 
        }
    };
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            navigate("/tipogestion");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("No es posible eliminar, tipo de gestion está siendo utilizado.");
            }
 
        }
    };
 
 
 
    return (
        <div className="container">
            <h1>Eliminar Tipo de gestion</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )
 
            }
            <div className="card">
                <div className="card-header">Confirme la eliminación del Tipo de gestion</div>
                <div className="card-body">
                    <h1>¿Desea eliminar este tipo de gestion?</h1>
                    <h2>{tipogestion && tipogestion.nombre_tipo_gestion} </h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} >Eliminar Tipo de gestion</button>
 
                </div>
            </div>
        </div>
    )
 
}
export default EliminarTipoGestion;