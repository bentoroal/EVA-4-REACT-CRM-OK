import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";//useParams para tomar parametros de la ruta para eliminar por id
 
function EliminarUsuario(){
    const navigate = useNavigate();
    const [usuario,setUsuario] = useState([]);
    const [error,setError] = useState("");
 
    let {id} = useParams();
 
    useEffect(() => {
        cargarDatosUsuario();
    },[]);
 
    const cargarDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id}`);
            setUsuario(response.data[0]);
        } catch (error) {
            console.log(error);
 
        }
    };
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/usuario/${id}`);
            navigate("/usuarios");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("No es posible eliminar, usuario está siendo utilizado.");
            }
 
        }
    };
 
 
 
    return (
        <div className="container">
            <h1>Eliminar Usuario</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )
 
            }
            <div className="card">
                <div className="card-header">Confirme la eliminación del Usuario</div>
                <div className="card-body">
                    <h1>¿Desea eliminar este usuario?</h1>
                    <h2>{usuario && usuario.username} </h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} >Eliminar Usuario</button>
 
                </div>
            </div>
        </div>
    )
 
}
export default EliminarUsuario;
