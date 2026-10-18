import { useState } from 'react';

export const Carrito = () => {
   
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem('carritoVetSanMarcos');
        return guardado ? JSON.parse(guardado) : [];
    });

    
    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem('carritoVetSanMarcos', JSON.stringify(nuevoCarrito));
    };

    const eliminarItem = (codigo) => {
        const nuevoCarrito = carrito.filter(item => item.codigo !== codigo);
        actualizarCarrito(nuevoCarrito);
    };

    const vaciarCarrito = () => {
        if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            actualizarCarrito([]);
        }
    };

    const procesarPago = () => {
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.');
        actualizarCarrito([]);
    };

    
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

   
    if (carrito.length === 0) {
        return (
            <div className="container mt-5 text-center" style={{ maxWidth: '900px' }}>
                <h1 className="mb-4">Mi Carrito de Compras</h1>
                <div className="p-5 bg-white rounded shadow-sm">
                    <h3>Tu carrito está vacío 🐾</h3>
                    <p className="text-muted my-3">¡Explora nuestro catálogo para añadir servicios y medicamentos!</p>
                </div>
            </div>
        );
    }

   
    return (
        <div className="container mt-5" style={{ maxWidth: '900px' }}>
            <h1 className="mb-4 text-center">Mi Carrito de Compras</h1>
            
            <div className="d-flex flex-column gap-3">
                {carrito.map(item => {
                    const subtotal = item.precio * item.cantidad;
                    return (
                        <div key={item.codigo} className="d-flex align-items-center justify-content-between bg-white p-3 rounded shadow-sm flex-wrap gap-3">
                            <img 
                                src={item.imagen} 
                                alt={item.nombre} 
                                className="rounded" 
                                style={{ width: '70px', height: '70px', objectFit: 'cover' }} 
                            />
                            
                            <div className="flex-grow-1" style={{ minWidth: '150px' }}>
                                <h4 className="m-0 mb-1">{item.nombre}</h4>
                                <p className="text-muted m-0 small">
                                    Precio unitario: ${item.precio.toLocaleString('es-CL')}
                                </p>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span>Cantidad:</span>
                                <span className="fw-bold bg-light px-3 py-1 rounded border">
                                    {item.cantidad}
                                </span>
                            </div>

                            <div className="text-end" style={{ minWidth: '100px' }}>
                                <p className="fw-bold text-primary fs-5 m-0">
                                    ${subtotal.toLocaleString('es-CL')}
                                </p>
                            </div>

                            <button onClick={() => eliminarItem(item.codigo)} className="btn btn-danger btn-sm">
                                🗑️ Eliminar
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white p-4 rounded shadow-sm mt-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <button onClick={vaciarCarrito} className="btn btn-secondary fw-bold">
                    Vaciar Carrito
                </button>
                
                <div className="text-end">
                    <h3 className="mb-3">
                        Total: <span className="text-success">${total.toLocaleString('es-CL')}</span>
                    </h3>
                    <button onClick={procesarPago} className="btn btn-success fw-bold fs-5 px-4">
                        Proceder al Pago 💳
                    </button>
                </div>
            </div>
        </div>
    );
};