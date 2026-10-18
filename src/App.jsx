
import { useState } from "react";

import { Header } from "./components/layout/Header";
import { Inicio } from "./components/Inicio";
import { Catalogo } from "./components/Catalogo";
import { Carrito } from "./components/Carrito";
import { Detalle } from "./components/detalle";
import { Login } from "./components/Login";
import { Registro } from "./components/Registro";
import { Blog } from "./components/blog";
import { Contacto } from "./components/Contacto";

function App() {
    const [vistaActual, setVistaActual] = useState("inicio");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const verDetalleProducto = (codigo) => {
        setProductoSeleccionado(codigo);
        setVistaActual("detalle");
    };

    return (
        <div className="bg-light min-vh-100 pb-5">
            <Header setVistaActual={setVistaActual} />
            {vistaActual === "inicio" && (
                <Inicio verDetalle={verDetalleProducto} />
            )}
            {vistaActual === "catalogo" && (
                <Catalogo verDetalle={verDetalleProducto} />
            )}
            {vistaActual === "carrito" && <Carrito />}
            {vistaActual === "detalle" && (
                <Detalle
                    codigoProducto={productoSeleccionado}
                    setVistaActual={setVistaActual}
                />
            )}
            {vistaActual === "login" && (
                <Login setVistaActual={setVistaActual} />
            )}
            {vistaActual === "registro" && (
                <Registro setVistaActual={setVistaActual} />
            )}
            {vistaActual === "blog" && <Blog />}
            {vistaActual === "contacto" && <Contacto />}
        </div>
    );
}

export default App;
