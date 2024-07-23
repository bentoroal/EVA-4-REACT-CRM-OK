import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarGestion(){

    const [id_usuario,setIdUsuario] = useState("");
    const [id_cliente,setIdCliente] = useState("");
    const [id_tipo_gestion,setIdTipoGestion] = useState("");
    const [id_resultado,setIdResultado] = useState("");
    const [comentarios,setComentarios] = useState("");

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
    

    let {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        cargarDatosGestion();
    },[]);


    const cargarDatosGestion = async () => {
        try {//
            const response = await axios.get(`http://144.126.210.74:8080/api/gestion/${id}`);
            const gestion = response.data[0];
            setIdUsuario(gestion.id_usuario);
            setIdCliente(gestion.id_cliente);
            setIdTipoGestion(gestion.id_tipo_gestion);
            setIdResultado(gestion.id_resultado)
            setComentarios(gestion.comentarios);

        } catch (error) {
            console.log(error);
 
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const gestion = {
                id_usuario,
                id_cliente,
                id_tipo_gestion,
                id_resultado,
                comentarios
            }
            await axios.patch(`http://144.126.210.74:8080/api/gestion/${id}`,gestion);

            navigate("/gestiones");
        } catch (error) {
            console.log(error);
 
        }
    };

    return(
        <div className="container">
            <h1>Actualizar gestion</h1>
            <hr></hr>
            <div className="card">
                <div className="card-header">Complete los datos a actualizar</div>
                <div className="card-body">
                <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="sel_id_usuario" className="form-label">Usuario</label>
                        <select id="sel_id_usuario" className="form-select" onChange={(e) => setIdUsuario(e.target.value)}>
                            {usuarios.map((usuario) => {
                                if (id_usuario === usuario.id_usuario) {
                                   return <option value={usuario.id_usuario} selected>{usuario && usuario.nombres} {usuario.apellidos}</option>;
                                } else {
                                   return <option value={usuario.id_usuario}>{usuario && usuario.nombres} {usuario.apellidos}</option>;
                                }
                            })} 
                        </select> 
                </div>

                <div className="form-group">
                    <label htmlFor="sel_id_cliente" className="form-label">Cliente</label>
                    <select id="sel_id_cliente" className="form-select" onChange={(e) => setIdCliente(e.target.value)}>
                            {clientes.map((cliente) => {
                                if (id_cliente === cliente.id_cliente) {
                                   return <option value={cliente.id_cliente} selected>{cliente && cliente.nombres} {cliente.apellidos}</option>;
                                } else {
                                   return <option value={cliente.id_cliente}>{cliente && cliente.nombres} {cliente.apellidos}</option>;
                                }
                            })} 
                        </select> 

                </div>
        
                <div className="form-group">
                    <label htmlFor="sel_id_tipo_gestion" className="form-label">Tipo de gestion</label>
                    <select id="sel_id_tipo_gestion" className="form-select" onChange={(e) => setIdTipoGestion(e.target.value)}>
                    {tipogestiones.map((tipogestion) => {
                        if (id_tipo_gestion === tipogestion.id_tipo_gestion) {
                           return <option value={tipogestion.id_tipo_gestion} selected>{tipogestion.nombre_tipo_gestion}</option> 
                        } else{
                            return <option value={tipogestion.id_tipo_gestion}>{tipogestion.nombre_tipo_gestion}</option> 
                        }                
                    })}  
                    </select> 
                </div>

                <div className="form-group">
                    <label htmlFor="sel_id_resultado" className="form-label">Resultado</label>
                    <select id="sel_id_resultado" className="form-select" onChange={(e) => setIdResultado(e.target.value)}>
                    {resultados.map((resultado) => {
                        if (id_resultado === resultado.id_resultado) {
                           return <option value={resultado.id_resultado} selected>{resultado.nombre_resultado}</option> 
                        } else{
                            return <option value={resultado.id_resultado}>{resultado.nombre_resultado}</option> 
                        }                
                    })}
                    </select> 
                </div>

                <div className="form-group">
                    <label>Comentarios</label>
                    <input type="text" className="form-control" value={comentarios} onChange={(e) => setComentarios(e.target.value) }></input>
                </div>

                
                <hr></hr>
                <button type="submit" className="btn btn-primary">Actualizar gestion</button>        

                </form> 
                </div>
            </div>
        </div>
    )
}

export default ActualizarGestion;