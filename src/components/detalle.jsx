import { useState } from 'react';
import { servicios } from '../data/servicios';
import { medicamentos } from '../data/medicamentos';

export const Detalle = ({ codigoProducto, setVistaActual }) => {
    
    const catalogoCompleto = [...servicios, ...medicamentos];
    const producto = catalogoCompleto.find(p => (p['Código'] || p.codigo) === codigoProducto);

   
    const [cantidad, setCantidad] = useState(1);

    if (!producto) {
        return (
            <div className="container mt-5 text-center">
                <h2>Producto no encontrado</h2>
                <button className="btn btn-link" onClick={() => setVistaActual('catalogo')}>
                    ← Volver al Catálogo
                </button>
            </div>
        );
    }

    
    const nombre = producto['Nombre del servicio'] || producto['Nombre comercial'] || producto.nombre;
    const precio = producto['Precio (CLP)'] || producto['Precio unitario (CLP)'] || producto.precio;
    const descripcion = producto.observaciones || producto.principioActivo || 'Sin descripción adicional.';
    const imagen = producto.imagen || 'https://placehold.co/600x400?text=Imagen+No+Disponible';
    
    
    const esMedicamento = producto.stock !== undefined;

   
    const agregarAlCarrito = () => {
        let carrito = JSON.parse(localStorage.getItem('carritoVetSanMarcos')) || [];
        const indexExistente = carrito.findIndex(item => item.codigo === codigoProducto);
        
        if (indexExistente !== -1) {
            carrito[indexExistente].cantidad += cantidad;
        } else {
            carrito.push({
                codigo: codigoProducto,
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad: cantidad
            });
        }
        
        localStorage.setItem('carritoVetSanMarcos', JSON.stringify(carrito));
        alert(`¡${cantidad}x ${nombre} añadido al carrito con éxito!`);
    };

    return (
        <main className="container mt-4 mb-5" style={{ maxWidth: '900px' }}>
            <button 
                onClick={() => setVistaActual('catalogo')} 
                className="btn btn-link text-decoration-none ps-0 mb-4 fw-bold"
            >
                ← Volver al Catálogo
            </button>
            
            <div className="bg-white p-4 p-md-5 rounded shadow-sm d-flex flex-column flex-md-row gap-4 gap-md-5">
                
               
                <div className="flex-fill" style={{ minWidth: '300px', maxWidth: '400px', margin: '0 auto' }}>
                    <img 
                        src={imagen} 
                        alt={nombre} 
                        className="img-fluid rounded shadow-sm w-100" 
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                
             
                <div className="flex-fill d-flex flex-column justify-content-center">
                    <h2 className="fw-bold mb-1 text-dark">{nombre}</h2>
                    <p className="text-muted mb-3">Código: {codigoProducto}</p>
                    <p className="text-primary fw-bold mb-4" style={{ fontSize: '2.2rem' }}>
                        \${precio.toLocaleString('es-CL')}
                    </p>
                    
                    <h5 className="fw-bold text-secondary mb-2">Detalles:</h5>
                    <p className="fs-5 mb-4" style={{ lineHeight: '1.6' }}>{descripcion}</p>
                    
                    <div className="d-flex align-items-center mt-auto gap-3">
                        
                        {esMedicamento && (
                            <select 
                                className="form-select border-secondary fw-bold" 
                                style={{ width: '80px', height: '50px', fontSize: '1.2rem', cursor: 'pointer' }}
                                value={cantidad}
                                onChange={(e) => setCantidad(parseInt(e.target.value))}
                            >
                                {[...Array(Math.min(producto.stock, 10)).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        )}
                        
                        <button 
                            onClick={agregarAlCarrito}
                            className="btn btn-success flex-grow-1 fw-bold fs-5" 
                            style={{ height: '50px' }}
                        >
                            🛒 Añadir al carrito
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
};