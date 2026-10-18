
import { useEffect, useState } from "react";
import { servicios } from "../data/servicios";
import { medicamentos } from "../data/medicamentos";

const CLAVE_CARRITO = "carritoVetSanMarcos";

export const Detalle = ({
    codigoProducto,
    setVistaActual,
}) => {
    const [cantidad, setCantidad] = useState(1);

    const catalogoCompleto = [...servicios, ...medicamentos];

    const producto = catalogoCompleto.find(
        (item) =>
            String(item["Código"] ?? item.codigo) ===
            String(codigoProducto)
    );

    useEffect(() => {
        setCantidad(1);
    }, [codigoProducto]);

    if (!producto) {
        return (
            <main className="container mt-5 text-center">
                <h2>Producto no encontrado</h2>

                <p className="text-muted mb-3">
                    No encontramos el producto o servicio solicitado.
                </p>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setVistaActual("catalogo")}
                >
                    ← Volver al catálogo
                </button>
            </main>
        );
    }

    const codigo = producto["Código"] ?? producto.codigo;

    const nombre =
        producto["Nombre del servicio"] ??
        producto["Nombre comercial"] ??
        producto.nombre ??
        "Producto veterinario";

    const precio = Number(
        producto["Precio (CLP)"] ??
        producto["Precio unitario (CLP)"] ??
        producto.precio ??
        0
    );

    const imagen =
        producto.imagen ||
        "https://placehold.co/600x400?text=Imagen+No+Disponible";

    const esMedicamento = producto.stock !== undefined;
    const stockDisponible = esMedicamento
        ? Math.max(0, Number(producto.stock) || 0)
        : null;

    const maxCantidad = esMedicamento
        ? Math.min(stockDisponible, 10)
        : 1;

    const categoria =
        producto.categoria ??
        (esMedicamento
            ? "Medicamento"
            : "Servicio veterinario");

    const detalles = [
        producto.observaciones,
        producto.principio_activo || producto.principioActivo
            ? `Principio activo: ${
                  producto.principio_activo ??
                  producto.principioActivo
              }`
            : null,
        producto.presentacion
            ? `Presentación: ${producto.presentacion}`
            : null,
    ].filter(Boolean);

    const descripcion =
        detalles.length > 0
            ? detalles.join(" · ")
            : "Sin descripción adicional.";

    const agregarAlCarrito = () => {
        if (esMedicamento && stockDisponible < 1) {
            alert("Este medicamento no tiene stock disponible.");
            return;
        }

        let carrito = [];

        try {
            const guardado = localStorage.getItem(CLAVE_CARRITO);
            const datos = guardado ? JSON.parse(guardado) : [];
            carrito = Array.isArray(datos) ? datos : [];
        } catch {
            alert("No se pudo leer el carrito guardado.");
            return;
        }

        const cantidadAgregar = esMedicamento ? cantidad : 1;

        const indiceExistente = carrito.findIndex(
            (item) => String(item.codigo) === String(codigo)
        );

        if (esMedicamento) {
            const cantidadActual =
                indiceExistente >= 0
                    ? Number(carrito[indiceExistente].cantidad) || 0
                    : 0;

            if (cantidadActual + cantidadAgregar > stockDisponible) {
                alert(
                    `Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`
                );
                return;
            }
        }

        if (indiceExistente >= 0) {
            carrito[indiceExistente] = {
                ...carrito[indiceExistente],
                cantidad:
                    (Number(carrito[indiceExistente].cantidad) || 0) +
                    cantidadAgregar,
            };
        } else {
            carrito.push({
                codigo,
                nombre,
                precio,
                imagen,
                cantidad: cantidadAgregar,
            });
        }

        try {
            localStorage.setItem(
                CLAVE_CARRITO,
                JSON.stringify(carrito)
            );

            alert(
                `¡${cantidadAgregar}x ${nombre} añadido al carrito con éxito!`
            );
        } catch {
            alert("No se pudo guardar el carrito.");
        }
    };

    return (
        <main
            className="container mt-4 mb-5"
            style={{ maxWidth: "1000px" }}
        >
            <button
                type="button"
                onClick={() => setVistaActual("catalogo")}
                className="btn btn-link text-decoration-none ps-0 mb-4 fw-bold"
            >
                ← Volver al catálogo
            </button>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-4 p-md-5">
                    <div className="row g-4 g-lg-5 align-items-center">
    
                        <div className="col-12 col-md-5">
                            <img
                                src={imagen}
                                alt={nombre}
                                className="img-fluid rounded shadow-sm w-100"
                                style={{
                                    maxHeight: "420px",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div className="col-12 col-md-7">
                            <span className="badge bg-light text-dark border mb-3">
                                {categoria}
                            </span>

                            <h2 className="fw-bold mb-2 text-dark">
                                {nombre}
                            </h2>

                            <p className="text-muted small mb-3">
                                Código: {codigo}
                            </p>

                            <p className="text-primary fw-bold mb-4 fs-1">
                                ${precio.toLocaleString("es-CL")}
                            </p>

                            <h5 className="fw-bold text-secondary mb-2">
                                Detalles
                            </h5>

                            <p className="mb-4">
                                {descripcion}
                            </p>

                            {producto.especie && (
                                <p className="mb-2">
                                    <strong>Especie:</strong>{" "}
                                    {producto.especie}
                                </p>
                            )}

                            {producto.duracion && (
                                <p className="mb-2">
                                    <strong>Duración:</strong>{" "}
                                    {producto.duracion}
                                </p>
                            )}

                            {esMedicamento && stockDisponible > 0 && (
                                <p className="text-muted small mb-3">
                                    Stock disponible: {stockDisponible}
                                </p>
                            )}

                            {esMedicamento && stockDisponible === 0 && (
                                <div className="alert alert-warning">
                                    Este medicamento está agotado.
                                </div>
                            )}

                            <div className="d-flex flex-column flex-sm-row align-items-stretch gap-3 mt-4">
                                {esMedicamento && stockDisponible > 0 && (
                                    <div>
                                        <label
                                            htmlFor="cantidad-producto"
                                            className="form-label fw-bold"
                                        >
                                            Cantidad
                                        </label>

                                        <select
                                            id="cantidad-producto"
                                            className="form-select border-secondary fw-bold"
                                            value={cantidad}
                                            onChange={(e) =>
                                                setCantidad(
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {Array.from(
                                                { length: maxCantidad },
                                                (_, i) => i + 1
                                            ).map((numero) => (
                                                <option
                                                    key={numero}
                                                    value={numero}
                                                >
                                                    {numero}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={agregarAlCarrito}
                                    className="btn btn-success flex-grow-1 fw-bold align-self-end"
                                    disabled={
                                        esMedicamento &&
                                        stockDisponible === 0
                                    }
                                >
                                    🛒 Añadir al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
