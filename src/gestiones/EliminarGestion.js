import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";//useParams para tomar parametros de la ruta para eliminar por id
 
function EliminarGestion(){
    const navigate = useNavigate();
    const [gestion,setGestion] = useState([]);
    const [error,setError] = useState("");
 
    let {id} = useParams();
 
    useEffect(() => {
        cargarDatosGestion();
    },[]);
 
    const cargarDatosGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/gestion/${id}`);
            setGestion(response.data[0]);
        } catch (error) {
            console.log(error);
 
        }
    };
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/gestion/${id}`);
            navigate("/gestiones");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("No es posible eliminar.");
            }
 
        }
    };
 
 
 
    return (
        <div className="container">
            <h1>Eliminar Gestion</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )
 
            }
            <div className="card">
                <div className="card-header">Confirme la eliminación de la gestion</div>
                <div className="card-body">
                    <h1>¿Desea eliminar la gestion con el siguiente id?</h1>
                    <h2> {gestion.id_gestion}</h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} >Eliminar Gestion</button>
 
                </div>
            </div>
        </div>
    )
 
}
export default EliminarGestion;