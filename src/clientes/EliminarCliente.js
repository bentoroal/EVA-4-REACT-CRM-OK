import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";//useParams para tomar parametros de la ruta para eliminar por id
 
function EliminarCliente(){
    const navigate = useNavigate();
    const [cliente,setCliente] = useState([]);
    const [error,setError] = useState("");
 
    let {id} = useParams();
 
    useEffect(() => {
        cargarDatosCliente();
    },[]);
 
    const cargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/cliente/${id}`);
            setCliente(response.data[0]);
        } catch (error) {
            console.log(error);
 
        }
    };
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/cliente/${id}`);
            navigate("/clientes");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("No es posible eliminar, cliente está siendo utilizado.");
            }
 
        }
    };
 
 
 
    return (
        <div className="container">
            <h1>Eliminar Cliente</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )
 
            }
            <div className="card">
                <div className="card-header">Confirme la eliminación del cliente</div>
                <div className="card-body">
                    <h1>¿Desea eliminar a este cliente?</h1>
                    <h2>{cliente && cliente.nombres} {cliente.apellidos}</h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} >Eliminar Cliente</button>
 
                </div>
            </div>
        </div>
    )
 
}
export default EliminarCliente;
