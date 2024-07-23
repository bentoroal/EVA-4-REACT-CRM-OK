import React, {useEffect, useState} from "react"; //useState para trabajar con almacenamiento
import axios from "axios";
import { Link } from "react-router-dom";
//jsx es el lenguaje del siguiente codigo, lo usa React, es similar a html
function ListaClientes(){
    //Clientes es el almacenamiento o constante y setclientes la instruccion o como los almacena, se deja vacio por ahora el useState pero soporta multiples elementos
    const [clientes,setClientes] = useState([]);
    //Esta sintaxis es asincrona, se ejecutan independientemente, especificamente cuando se usa la palabra await, que espera obtener los datos para continuar
    //=>{} Son funciones anonimas o lambda, se ahorran lineas de codigo, se evita ponerle nombre, solo instrucciones
    useEffect(() =>{
        const fetchClientes = async() =>{
            //try catch es manajo de excepciones, el try es lo ideal, si falla se activa el catch
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/cliente?_size=200');
                setClientes(response.data) //Es el eqwuivalente a clientes = responde.data
            } catch (error) {
                console.log(error)    
            }
        };
        fetchClientes(); //ejecuta el codigo anterior
    },[]); //estructura parte vacia inicialmente

    return(       //lenguaje jsx para desarrollar pero al renderizarse se muestra en html
        <div className= 'container'>
            <h1>Lista de Clientes</h1>
        <div className="card">
            <div className="card-header">Lista de Clientes registrados</div>
            <div className="card-body">
            <a href="/clientes/agregar/" className="btn btn-primary">Nuevo Cliente</a>
            <hr></hr>
            <table className= 'table'>
                <thead>
                    <th>RUT</th>
                    <th>DV</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>Acciones</th>
                
                </thead>
                <tbody>       
                {/*clientes es la constante que almacena los datos y cliente es dato individual, 
                seguido del nombre del campo en el servidor  */}
                    {clientes.map((cliente) => ( //recorre los datos y los muestra en la lista
                        <tr>
                            <td> {cliente.id_cliente}</td>
                            <td> {cliente.dv}</td>
                            <td> {cliente.nombres}</td>
                            <td> {cliente.apellidos}</td>
                            <td> {cliente.email}</td>
                            <td> {cliente.celular}</td>
                            <td> <Link to={`/clientes/eliminar/${cliente.id_cliente}`} className="btn btn-danger">Eliminar</Link> </td>
                            <td> <Link to={`/clientes/actualizar/${cliente.id_cliente}`} className="btn btn-warning">Actualizar</Link> </td>

                        </tr>
                      ) )  }    
                </tbody>
            </table>
        </div>
        </div>
        </div>
    )
}
export default ListaClientes;