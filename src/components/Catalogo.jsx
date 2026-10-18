
import { useState } from "react";
import { servicios } from "../data/servicios";
import { medicamentos } from "../data/medicamentos";
import { ItemCard } from "./cards/ItemCard.jsx";

// Normalizamos los servicios para que ItemCard reciba datos uniformes.
const serviciosFormateados = servicios.map((servicio) => ({
    ...servicio,
    codigo: servicio["Código"] ?? servicio.codigo,
    nombre:
        servicio["Nombre del servicio"] ??
        servicio.nombre ??
        "Servicio veterinario",
    precio: Number(
        servicio["Precio (CLP)"] ?? servicio.precio ?? 0
    ),
    categoriaPrincipal: "servicios",
    imagen:
        servicio.imagen ||
        "https://placehold.co/300x200?text=Servicio+Veterinario",
}));

// Normalizamos los medicamentos conservando stock y otros datos.
const medicamentosFormateados = medicamentos.map((medicamento) => ({
    ...medicamento,
    codigo: medicamento["Código"] ?? medicamento.codigo,
    nombre:
        medicamento["Nombre comercial"] ??
        medicamento.nombre ??
        "Medicamento veterinario",
    precio: Number(
        medicamento["Precio unitario (CLP)"] ??
        medicamento.precio ??
        0
    ),
    categoriaPrincipal: "medicamentos",
    imagen:
        medicamento.imagen ||
        "https://placehold.co/300x200?text=Medicamento",
}));

const catalogoCompleto = [
    ...serviciosFormateados,
    ...medicamentosFormateados,
];

export const Catalogo = ({ verDetalle }) => {
    const [filtro, setFiltro] = useState("todos");

    const productosFiltrados =
        filtro === "todos"
            ? catalogoCompleto
            : catalogoCompleto.filter(
                  (producto) =>
                      producto.categoriaPrincipal === filtro
              );

    const filtros = [
        { valor: "todos", texto: "Todos" },
        { valor: "servicios", texto: "Servicios Médicos" },
        {
            valor: "medicamentos",
            texto: "Medicamentos y Vacunas",
        },
    ];

    return (
        <main className="container mt-5 mb-5">
            <h1 className="text-center mb-4">
                Nuestro Catálogo
            </h1>

            {/* Filtros del catálogo */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
                {filtros.map((opcion) => (
                    <button
                        key={opcion.valor}
                        type="button"
                        className={`btn ${
                            filtro === opcion.valor
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        onClick={() => setFiltro(opcion.valor)}
                    >
                        {opcion.texto}
                    </button>
                ))}
            </div>

            {/* Tarjetas reutilizables */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productosFiltrados.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No hay productos para mostrar.</p>
                    </div>
                ) : (
                    productosFiltrados.map((producto) => (
                        <div
                            key={producto.codigo}
                            className="col"
                        >
                            <ItemCard
                                producto={producto}
                                onVerDetalle={verDetalle}
                            />
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};
