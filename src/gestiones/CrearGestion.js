import React , {useEffect, useState} from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CrearGestion(){

    const [id_usuario,setIdUsuario] = useState("");
    const [id_cliente,setIdCliente] = useState("");
    const [id_tipo_gestion,setIdTipoGestion] = useState("");
    const [id_resultado,setIdResultado] = useState("");
    const [comentarios,setComentarios] = useState("");
    const [error,setError] = useState("");

    const [usuarios,setUsuarios] = useState([]);
    useEffect(() =>{
        const fetchUsuarios = async() =>{
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/usuario?_size=200');
                setUsuarios(response.data)
            } catch (error) {
                console.log(error)    
            }
        };
        fetchUsuarios();
    },[]);

    const [clientes,setClientes] = useState([]);
    useEffect(() =>{
        const fetchClientes = async() =>{
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/cliente?_size=200');
                setClientes(response.data)
            } catch (error) {
                console.log(error)    
            }
        };
        fetchClientes();
    },[]);

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

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fecha_registro = new Date().toISOString().slice(0,19).replace('T',' ');
            await axios.post('http://144.126.210.74:8080/api/gestion',{ 
                id_usuario, 
                id_cliente,
                id_tipo_gestion,
                id_resultado,
                comentarios,
                fecha_registro
            });
            navigate("/gestiones");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("Se ha producido un error: " + error.response.statusText);
            }
        }
    }

    
 

    return(

    <div className="container">
        <h1>Agregar Gestion</h1>
        <hr></hr>
        {error &&(
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
        )
        }

        <div className="card">
            <div className="card-header">Complete los datos de la nueva gestion</div>
            <div className="card-body">
                <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="sel_id_usuario" className="form-label">Usuario</label>
                        <select id="sel_id_usuario" className="form-select" onChange={(e) => setIdUsuario(e.target.value)}>
                            {usuarios.map((usuario) => (  
                                <option value={usuario.id_usuario}>{usuario && usuario.nombres} {usuario.apellidos}</option>                 
                        ) )  }  
                        </select> 
                </div>

                <div className="form-group">
                    <label htmlFor="sel_id_cliente" className="form-label">Cliente</label>
                    <select id="sel_id_cliente" className="form-select" onChange={(e) => setIdCliente(e.target.value)}>

                    {clientes.map((cliente) => (  
                            <option value={cliente.id_cliente}>{cliente && cliente.nombres} {cliente.apellidos}</option>                 
                    ) )  }  
                    </select> 
                </div>
        
                <div className="form-group">
                    <label htmlFor="sel_id_tipo_gestion" className="form-label">Tipo de gestion</label>
                    <select id="sel_id_tipo_gestion" className="form-select" onChange={(e) => setIdTipoGestion(e.target.value)}>

                    {tipogestiones.map((tipogestion) => (  
                            <option value={tipogestion.id_tipo_gestion}>{tipogestion.nombre_tipo_gestion}</option>                 
                    ) )  }  
                    </select> 
                </div>

                <div className="form-group">
                    <label htmlFor="sel_id_resultado" className="form-label">Resultado</label>
                    <select id="sel_id_resultado" className="form-select" onChange={(e) => setIdResultado(e.target.value)}>

                    {resultados.map((resultado) => (  
                            <option value={resultado.id_resultado}>{resultado.nombre_resultado}</option>                 
                    ) )  }  
                    </select> 
                </div>

                <div className="form-group">
                    <label>Comentarios</label>
                    <input type="text" className="form-control" value={comentarios} onChange={(e) => setComentarios(e.target.value) }></input>
                </div>

                
                <hr></hr>
                <button type="submit" className="btn btn-primary">Crear gestion</button>        

                </form> 
            </div>
        </div>
    </div>
)
}

export default CrearGestion;
