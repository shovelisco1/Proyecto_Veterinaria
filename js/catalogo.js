document.addEventListener('DOMContentLoaded', () => {
    const gridProductos = document.getElementById('grid-productos');
    const botonesFiltro = document.querySelectorAll('.btn-filtro');

    let catalogoCompleto = [];

    if (typeof servicios !== 'undefined') {
        const serviciosFormateados = servicios.map(s => ({
            codigo: s['Código'] || s.codigo,
            nombre: s['Nombre del servicio'] || s.nombre,
            precio: s['Precio (CLP)'] || s.precio,
            categoriaPrincipal: 'servicios',
            imagen: s.imagen || 'https://placehold.co/300x200?text=Servicio+Veterinario'
        }));
        catalogoCompleto = [...catalogoCompleto, ...serviciosFormateados];
    }

    if (typeof medicamentos !== 'undefined') {
        const medicamentosFormateados = medicamentos.map(m => ({
            codigo: m['Código'] || m.codigo,
            nombre: m['Nombre comercial'] || m.nombre,
            precio: m['Precio unitario (CLP)'] || m.precio,
            categoriaPrincipal: 'medicamentos',
            imagen: m.imagen || 'https://placehold.co/300x200?text=Medicamento'
        }));
        catalogoCompleto = [...catalogoCompleto, ...medicamentosFormateados];
    }

    function renderizarCatalogo(productos) {
        gridProductos.innerHTML = ''; 

        if (productos.length === 0) {
            gridProductos.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No hay productos para mostrar.</p>';
            return;
        }

        productos.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-producto'); 
            
            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; border-radius: 5px;">
                <div style="padding: 15px;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 10px;">${producto.nombre}</h3>
                    <p style="color: #007bff; font-weight: bold; font-size: 1.2rem; margin-bottom: 15px;">$${producto.precio}</p>
                    <button class="btn-agregar-carrito" data-codigo="${producto.codigo}" style="width: 100%; padding: 10px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        Añadir al carrito
                    </button>
                </div>
            `;
            gridProductos.appendChild(tarjeta);
        });
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            e.target.classList.add('activo');

            const filtro = e.target.getAttribute('data-filtro');

            if (filtro === 'todos') {
                renderizarCatalogo(catalogoCompleto);
            } else {
                const productosFiltrados = catalogoCompleto.filter(p => p.categoriaPrincipal === filtro);
                renderizarCatalogo(productosFiltrados);
            }
        });
    });

    renderizarCatalogo(catalogoCompleto);
});