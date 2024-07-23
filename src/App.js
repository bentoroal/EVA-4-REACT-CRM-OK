import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./ui/TopBar";
import Home from "./ui/Home";
import ListaClientes from "./clientes/ListaClientes";
import ListaUsuarios from "./usuarios/ListaUsuarios";
import ListaResultados from "./resultados/ListaResultados";
import ListaTipoGestion from "./tipogestion/ListaTipoGestion";
import ListaGestiones from "./gestiones/ListaGestion.js";
import CrearCliente from "./clientes/CrearCliente";
import CrearResultado from "./resultados/CrearResultado.js";
import CrearGestion from "./gestiones/CrearGestion.js";
import CrearTipoGestion from "./tipogestion/CrearTipoGestion.js";
import CrearUsuario from "./usuarios/CrearUsuario.js";
import EliminarCliente from "./clientes/EliminarCliente.js";
import EliminarResultado from "./resultados/EliminarResultado.js";
import EliminarGestion from "./gestiones/EliminarGestion.js";
import EliminarTipoGestion from "./tipogestion/EliminarTipoGestion.js";
import EliminarUsuario from "./usuarios/EliminarUsuario.js";
import ActualizarCliente from "./clientes/ActualizarCliente.js";
import ActualizarResultado from "./resultados/ActualizarResultado.js";
import ActualizarTipoGestion from "./tipogestion/ActualizarTipoGestion.js";
import ActualizarUsuario from "./usuarios/ActualizarUsuario.js";
import ActualizarGestion from "./gestiones/ActualizarGestion.js";


// En eliminar usuario se cambian doble comillas a una comilla para que funcione bien, problema de ruta con doble comillas
function App() {
  return (
    <Router>
      <div>
        <TopBar/>
          <Routes> 
            <Route path="/clientes" element={<ListaClientes/>} />
            <Route path="/clientes/agregar" element={<CrearCliente/>} />
            <Route path='/clientes/eliminar/:id' element={<EliminarCliente/>} /> 
            <Route path='/clientes/actualizar/:id' element={<ActualizarCliente/>} /> 
            <Route path="/" element={<Home/>} />
            <Route path="/usuarios" element={<ListaUsuarios/>} />
            <Route path="/usuarios/agregar" element={<CrearUsuario/>} />
            <Route path='/usuarios/eliminar/:id' element={<EliminarUsuario/>} /> 
            <Route path='/usuarios/actualizar/:id' element={<ActualizarUsuario/>} /> 
            <Route path="/resultados" element={<ListaResultados/>} />
            <Route path="/resultados/agregar" element={<CrearResultado/>} />
            <Route path='/resultados/eliminar/:id' element={<EliminarResultado/>} /> 
            <Route path='/resultados/actualizar/:id' element={<ActualizarResultado/>} /> 
            <Route path="/gestiones" element={<ListaGestiones/>} />
            <Route path="/gestiones/agregar" element={<CrearGestion/>} />
            <Route path='/gestiones/eliminar/:id' element={<EliminarGestion/>} /> 
            <Route path='/gestiones/actualizar/:id' element={<ActualizarGestion/>} />
            <Route path="/tipogestion" element={<ListaTipoGestion/>} />
            <Route path="/tipogestion/agregar" element={<CrearTipoGestion/>} />
            <Route path='/tipogestion/eliminar/:id' element={<EliminarTipoGestion/>} /> 
            <Route path='/tipogestion/actualizar/:id' element={<ActualizarTipoGestion/>} /> 
          </Routes>
      </div>
    </Router>
  );
}

export default App;
