
export const ItemCard = ({
    producto,
    onVerDetalle,
    variant = "catalogo",
    onEliminar,
}) => {
    const codigo = producto.codigo ?? producto["Código"];

    const nombre =
        producto.nombre ??
        producto["Nombre del servicio"] ??
        producto["Nombre comercial"] ??
        "Producto veterinario";

    const precio = Number(
        producto.precio ??
        producto["Precio (CLP)"] ??
        producto["Precio unitario (CLP)"] ??
        0
    ) || 0;

    const imagen =
        producto.imagen ||
        "https://placehold.co/300x200?text=Vet+San+Marcos";

    const categoria =
        producto.categoria ??
        (producto.categoriaPrincipal === "medicamentos"
            ? "Medicamento"
            : "Servicio veterinario");

    const cantidad = Number(producto.cantidad) || 1;
    const subtotal = precio * cantidad;

    // Modo carrito
    if (variant === "carrito") {
        return (
            <article className="card border-0 shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row align-items-md-center gap-3">
                    <img
                        src={imagen}
                        alt={nombre}
                        className="rounded"
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                        }}
                    />

                    <div className="flex-grow-1">
                        <h5 className="mb-2">{nombre}</h5>

                        <p className="text-muted small mb-1">
                            Precio unitario: $
                            {precio.toLocaleString("es-CL")}
                        </p>

                        <span className="badge bg-light text-dark border">
                            Cantidad: {cantidad}
                        </span>
                    </div>

                    <div className="text-md-end">
                        <p className="text-muted small mb-1">
                            Subtotal
                        </p>

                        <p className="text-primary fw-bold fs-5 mb-0">
                            ${subtotal.toLocaleString("es-CL")}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onEliminar?.(codigo)}
                        disabled={!onEliminar}
                    >
                        🗑️ Eliminar
                    </button>
                </div>
            </article>
        );
    }

    // Modo catálogo e inicio
    return (
        <article className="card h-100 shadow-sm border-0">
            <img
                src={imagen}
                alt={nombre}
                className="card-img-top"
                style={{
                    height: "190px",
                    objectFit: "cover",
                }}
                loading="lazy"
            />

            <div className="card-body d-flex flex-column">
                <span className="badge bg-light text-dark align-self-start mb-2">
                    {categoria}
                </span>

                <h5 className="card-title">{nombre}</h5>

                {producto.especie && (
                    <p className="card-text text-muted small mb-1">
                        Especie: {producto.especie}
                    </p>
                )}

                {producto.duracion && (
                    <p className="card-text text-muted small mb-2">
                        Duración: {producto.duracion}
                    </p>
                )}

                <p className="card-text text-primary fs-4 fw-bold mb-3">
                    ${precio.toLocaleString("es-CL")}
                </p>

                <button
                    type="button"
                    className="btn btn-outline-primary fw-bold w-100 mt-auto"
                    onClick={() => onVerDetalle?.(codigo)}
                    disabled={!onVerDetalle}
                >
                    Ver detalles
                </button>
            </div>
        </article>
    );
};
