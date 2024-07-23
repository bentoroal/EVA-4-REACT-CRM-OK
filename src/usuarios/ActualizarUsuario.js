import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarUsuario(){

    const [id_usuario,setIdUsuario] = useState("");
    const [dv,setDv] = useState("");
    const [nombres,setNombres] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [email,setEmail] = useState("");
    const [celular,setCelular] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    let {id} = useParams();

    const navigate = useNavigate(); //Para redireccionar

    useEffect(() => {
        cargarDatosUsuario();
    },[]);


    const cargarDatosUsuario = async () => {
        try {//
            const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id}`);
            const usuario = response.data[0];
            setIdUsuario(usuario.id_usuario)
            setDv(usuario.dv)
            setNombres(usuario.nombres);
            setApellidos(usuario.apellidos)
            setEmail(usuario.email)
            setCelular(usuario.celular)
            setUsername(usuario.username)
            setPassword(usuario.password)

        } catch (error) {
            console.log(error);
 
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault(); //permite que se ejecute cuando se realiza la accion(submit)
        try {
            const usuario = {
                nombres,
                apellidos,
                email,
                celular
            }
            await axios.patch(`http://144.126.210.74:8080/api/usuario/${id}`,usuario);

            navigate("/usuarios");
        } catch (error) {
            console.log(error);
 
        }
    };

    return(
        <div className="container">
            <h1>Actualizar usuario</h1>
            <hr></hr>
            <div className="card">
                <div className="card-header">Complete los datos a actualizar</div>
                <div className="card-body">
                <form onSubmit={onSubmit} >
                
                        <div className="form-group">
                            <label>RUT</label>
                            <input type="number" className="form-control" value={id_usuario} disabled ></input>
                        </div>
                        <div className="form-group">
                            <label>DV</label>
                            <input type="text" className="form-control" value={dv} disabled ></input>
                        </div>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value) }></input>
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value) }></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value) }></input>
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="number" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value) }></input>
                        </div>
                        <div className="form-group">
                            <label>Nombre de usuario</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value) }></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value) }></input>
                        </div>
                        <hr></hr>
                        <button type="submit" className="btn btn-primary">Actualizar usuario</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ActualizarUsuario;