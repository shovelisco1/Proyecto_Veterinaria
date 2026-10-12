import { useState } from 'react';
import { servicios } from '../data/servicios';
import { medicamentos } from '../data/medicamentos';

const serviciosFormateados = servicios.map(s => ({
    codigo: s['Código'] || s.codigo,
    nombre: s['Nombre del servicio'] || s.nombre,
    precio: s['Precio (CLP)'] || s.precio,
    categoriaPrincipal: 'servicios',
    imagen: s.imagen || 'https://placehold.co/300x200?text=Servicio+Veterinario'
}));

const medicamentosFormateados = medicamentos.map(m => ({
    codigo: m['Código'] || m.codigo,
    nombre: m['Nombre comercial'] || m.nombre,
    precio: m['Precio unitario (CLP)'] || m.precio,
    categoriaPrincipal: 'medicamentos',
    imagen: m.imagen || 'https://placehold.co/300x200?text=Medicamento'
}));

const catalogoCompleto = [...serviciosFormateados, ...medicamentosFormateados];

export const Catalogo = ({ verDetalle }) => {
    const [filtro, setFiltro] = useState('todos');

    const productosFiltrados = filtro === 'todos' 
        ? catalogoCompleto 
        : catalogoCompleto.filter(p => p.categoriaPrincipal === filtro);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Nuestro Catálogo</h1>

            <div className="d-flex justify-content-center gap-2 mb-5">
                <button 
                    className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFiltro('todos')}
                >
                    Todos
                </button>
                <button 
                    className={`btn ${filtro === 'servicios' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFiltro('servicios')}
                >
                    Servicios Médicos
                </button>
                <button 
                    className={`btn ${filtro === 'medicamentos' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFiltro('medicamentos')}
                >
                    Medicamentos y Vacunas
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {productosFiltrados.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No hay productos para mostrar.</p>
                    </div>
                ) : (
                    productosFiltrados.map((producto) => (
                        <div key={producto.codigo} className="col">
                            <div className="card h-100 shadow-sm border-0">
                                <img 
                                    src={producto.imagen} 
                                    className="card-img-top" 
                                    alt={producto.nombre} 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => verDetalle(producto.codigo)}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-truncate">{producto.nombre}</h5>
                                    <p className="card-text text-primary fs-4 fw-bold mb-4">
                                        \${producto.precio.toLocaleString('es-CL')}
                                    </p>
                                    <button 
                                        className="btn btn-outline-primary mt-auto fw-bold w-100"
                                        onClick={() => verDetalle(producto.codigo)}
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};