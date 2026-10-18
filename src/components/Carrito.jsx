
import { useState } from "react";
import { ItemCard } from "./cards/ItemCard";

const CLAVE_CARRITO = "carritoVetSanMarcos";

export const Carrito = () => {
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem(CLAVE_CARRITO);

        if (!guardado) {
            return [];
        }

        try {
            const datos = JSON.parse(guardado);
            return Array.isArray(datos) ? datos : [];
        } catch {
            return [];
        }
    });

    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify(nuevoCarrito)
        );
    };

    const eliminarItem = (codigo) => {
        const nuevoCarrito = carrito.filter(
            (item) => item.codigo !== codigo
        );

        actualizarCarrito(nuevoCarrito);
    };

    const vaciarCarrito = () => {
        if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
            actualizarCarrito([]);
        }
    };

    const procesarPago = () => {
        alert("¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.");
        actualizarCarrito([]);
    };

    const total = carrito.reduce(
        (acumulado, item) =>
            acumulado +
            (Number(item.precio) || 0) *
                (Number(item.cantidad) || 0),
        0
    );

    if (carrito.length === 0) {
        return (
            <main
                className="container mt-5 text-center"
                style={{ maxWidth: "900px" }}
            >
                <h1 className="mb-4">Mi Carrito de Compras</h1>

                <div className="card border-0 shadow-sm p-5">
                    <h3>Tu carrito está vacío 🐾</h3>

                    <p className="text-muted my-3">
                        ¡Explora nuestro catálogo para añadir
                        servicios y medicamentos!
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main
            className="container mt-5 mb-5"
            style={{ maxWidth: "900px" }}
        >
            <h1 className="mb-4 text-center">
                Mi Carrito de Compras
            </h1>

            <div className="d-flex flex-column gap-3">
                {carrito.map((item) => (
                    <ItemCard
                        key={item.codigo}
                        producto={item}
                        variant="carrito"
                        onEliminar={eliminarItem}
                    />
                ))}
            </div>

            <section className="card border-0 shadow-sm mt-4">
                <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={vaciarCarrito}
                        className="btn btn-secondary fw-bold"
                    >
                        Vaciar carrito
                    </button>

                    <div className="text-end">
                        <h3 className="mb-3">
                            Total:{" "}
                            <span className="text-success">
                                ${total.toLocaleString("es-CL")}
                            </span>
                        </h3>

                        <button
                            type="button"
                            onClick={procesarPago}
                            className="btn btn-success fw-bold fs-5 px-4"
                        >
                            Proceder al Pago 💳
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};
