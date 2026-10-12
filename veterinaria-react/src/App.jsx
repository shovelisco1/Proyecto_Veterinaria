import { useState } from "react";
import { Header } from "./components/Header";
import { Inicio } from "./components/Inicio";
import { Catalogo } from "./components/Catalogo";
import { Carrito } from "./components/Carrito";
import { Detalle } from "./components/detalle"; 

function App() {
  const [vistaActual, setVistaActual] = useState('inicio');
  
  
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);


  const verDetalleProducto = (codigo) => {
    setProductoSeleccionado(codigo);
    setVistaActual('detalle');
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Header setVistaActual={setVistaActual} />
      
      {vistaActual === 'inicio' && <Inicio />}
      
      {vistaActual === 'catalogo' && <Catalogo verDetalle={verDetalleProducto} />}
      {vistaActual === 'carrito' && <Carrito />}
      
      {vistaActual === 'detalle' && (
          <Detalle 
              codigoProducto={productoSeleccionado} 
              setVistaActual={setVistaActual} 
          />
      )}
    </div>
  );
}

export default App;