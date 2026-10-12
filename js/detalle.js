document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-detalle');
    
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get('codigo');

    if (!codigo) {
        contenedor.innerHTML = '<h2>Producto no encontrado</h2>';
        return;
    }

    let catalogoCompleto = [];
    if (typeof servicios !== 'undefined') catalogoCompleto = [...catalogoCompleto, ...servicios];
    if (typeof medicamentos !== 'undefined') catalogoCompleto = [...catalogoCompleto, ...medicamentos];

    const producto = catalogoCompleto.find(p => p.codigo === codigo);

    if (!producto) {
        contenedor.innerHTML = '<h2>Producto no encontrado</h2>';
        return;
    }

    const nombre = producto['Nombre del servicio'] || producto['Nombre comercial'] || producto.nombre;
    const precio = producto['Precio (CLP)'] || producto['Precio unitario (CLP)'] || producto.precio;
    const descripcion = producto.observaciones || producto.principioActivo || 'Sin descripción adicional.';

    
    let selectorCantidadHTML = '';
    
    
    if (producto.stock !== undefined) {
        let opciones = '';
        
        const maximo = Math.min(producto.stock, 10);
        for (let i = 1; i <= maximo; i++) {
            opciones += `<option value="${i}">${i}</option>`;
        }
        
        selectorCantidadHTML = `
            <select id="cantidad-producto" style="width: 80px; height: 50px; font-size: 1.2rem; text-align: center; border: 1px solid #ccc; border-radius: 5px; cursor: pointer; margin-right: 15px; background-color: white;">
                ${opciones}
            </select>
        `;
    } else {
       
        selectorCantidadHTML = `<input type="hidden" id="cantidad-producto" value="1">`;
    }

    contenedor.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 40px; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 900px; margin: 0 auto;">
            
            <div style="flex: 1; min-width: 300px; max-width: 400px;">
                <img src="${producto.imagen}" alt="${nombre}" style="width: 100%; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            </div>
            
            <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; justify-content: center;">
                <h2 style="font-size: 2rem; margin-bottom: 5px; color: #333;">${nombre}</h2>
                <p style="color: #666; font-size: 1rem; margin-bottom: 15px;">Código: ${producto.codigo}</p>
                <p style="font-size: 2.2rem; color: #007bff; font-weight: bold; margin-bottom: 20px;">$${precio}</p>
                
                <h3 style="margin-bottom: 10px; color: #444;">Detalles:</h3>
                <p style="line-height: 1.6; font-size: 1.1rem; margin-bottom: 30px;">${descripcion}</p>
                
                <div style="display: flex; align-items: center;">
                    ${selectorCantidadHTML}
                    <button class="btn-agregar-carrito" data-codigo="${producto.codigo}" style="flex-grow: 1; height: 50px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1.1rem; transition: 0.2s;">
                        🛒 Añadir al carrito
                    </button>
                </div>
            </div>
            
        </div>
    `;
    
    const btnAgregar = contenedor.querySelector('.btn-agregar-carrito');
    
    btnAgregar.addEventListener('click', () => {
        
        const inputCantidad = document.getElementById('cantidad-producto');
        const cantidad = parseInt(inputCantidad.value);

        
        const productoParaCarrito = {
            codigo: producto.codigo,
            nombre: nombre,
            precio: precio,
            imagen: producto.imagen,
            cantidad: cantidad
        };

        
        let carrito = JSON.parse(localStorage.getItem('carritoVetSanMarcos')) || [];

       
        const indexExistente = carrito.findIndex(item => item.codigo === producto.codigo);
        
        if (indexExistente !== -1) {
            
            carrito[indexExistente].cantidad += cantidad;
        } else {
           
            carrito.push(productoParaCarrito);
        }

        
        localStorage.setItem('carritoVetSanMarcos', JSON.stringify(carrito));

        
        alert(`¡${cantidad}x ${nombre} añadido al carrito con éxito!`);
    });
});