import React , {createRef, useState} from "react"; //useState para trabajar con almacenamiento
import axios from "axios"; //Para trabajar con api
import { useNavigate } from "react-router-dom";


function CrearCliente(){
    //Como solo tiene un valor, no ser hace como lista, sino como elemento vacio
    //Se crea una constanta por cada campo para almacenar y setear
    const [id_cliente,setIdCliente] = useState("");
    const [dv,setDv] = useState("");
    const [nombres,setNombres] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [email,setEmail] = useState("");
    const [celular,setCelular] = useState("");
    const [error,setError] = useState("");

    //Navigate permite pasar de un componente a otro
    const navigate = useNavigate();
    //e.preventDefault permite que solo se ejecutue con el sumbit y no otros eventos  
    //toISOString cambia fecha a formato ISO, slice corta, replace reemplaza T por espacio
    // el await axios no lleva constante ya que los datos los tenemos ya almacenados
    // el post pide la url y los datos a enviar, como estan entre llaves son varios elementos
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fecha_registro = new Date().toISOString().slice(0,19).replace('T',' ');
            await axios.post('http://144.126.210.74:8080/api/cliente',{
                id_cliente, 
                dv , 
                nombres,
                apellidos,
                email,
                celular,
                fecha_registro
            });
            navigate("/clientes");
        } catch (error) {
            console.log(error);
            if(error.response) {
                setError("Se ha producido un error: " + error.response.statusText);
            }
        }
    }

    
 

    return(
        //Formularios de ingreso
        //onSubmit es jsx, luego se transforma en action al renderizar en html para el navegador
        //e.target.value es simil al getElementbyId
        
        <div className="container">
        <h1>Agregar Cliente</h1>
        <hr></hr>
        {error &&(
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
        )
        }

        <div className="card">
            <div className="card-header">Complete los datos del nuevo cliente</div>
            <div className="card-body">
                    <form onSubmit={onSubmit} >
                        <div className="form-group">
                            <label>RUT</label>
                            <input type="number" className="form-control" value={id_cliente} onChange={(e) => setIdCliente(e.target.value) }></input>
                        </div>
                        <div className="form-group">
                            <label>DV</label>
                            <input type="text" className="form-control" value={dv} onChange={(e) => setDv(e.target.value) }></input>
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
                        <hr></hr>
                        <button type="submit" className="btn btn-primary">Crear cliente</button>

                    </form>
        </div>
        </div>
    </div>
)
}
export default CrearCliente;

