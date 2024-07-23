import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";//useParams para tomar parametros de la ruta para eliminar por id
 
function EliminarResultado(){
    const navigate = useNavigate();
    const [resultado,setResultado] = useState([]);
    const [error,setError] = useState("");
 
    let {id} = useParams();
 
    useEffect(() => {
        cargarDatosResultado();
    },[]);
 
    const cargarDatosResultado = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/resultado/${id}`);
            setResultado(response.data[0]);
        } catch (error) {
            console.log(error);
 
        }
    };
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/resultado/${id}`);
            navigate("/resultados");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("No es posible eliminar, resultado está siendo utilizado.");
            }
 
        }
    };
 
 
 
    return (
        <div className="container">
            <h1>Eliminar Resultado</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )
 
            }
            <div className="card">
                <div className="card-header">Confirme la eliminación del Resultado</div>
                <div className="card-body">
                    <h1>¿Desea eliminar este resultado?</h1>
                    <h2>{resultado && resultado.nombre_resultado} </h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} >Eliminar Resultado</button>
 
                </div>
            </div>
        </div>
    )
 
}
export default EliminarResultado;
