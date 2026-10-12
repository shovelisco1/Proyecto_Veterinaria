document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');

    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carritoVetSanMarcos')) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem('carritoVetSanMarcos', JSON.stringify(carrito));
        renderizarCarrito();
    }

    function renderizarCarrito() {
        const carrito = obtenerCarrito();
        
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        if (contadorCarrito) contadorCarrito.textContent = totalItems;

        if (carrito.length === 0) {
            contenedor.innerHTML = `
                <div style="text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h3>Tu carrito está vacío 🐾</h3>
                    <p style="color: #666; margin: 15px 0;">¡Explora nuestro catálogo para añadir servicios y medicamentos!</p>
                    <a href="catalogo.html" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Catálogo</a>
                </div>
            `;
            return;
        }

        let total = 0;
        let itemsHTML = '';

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            itemsHTML += `
                <div style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); flex-wrap: wrap; gap: 15px;">
                    <img src="${item.imagen}" alt="${item.nombre}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 5px;">
                    
                    <div style="flex: 2; min-width: 150px;">
                        <h4 style="margin-bottom: 5px;">${item.nombre}</h4>
                        <p style="color: #666; font-size: 0.9rem;">Precio unitario: $${item.precio}</p>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>Cantidad:</span>
                        <span style="font-weight: bold; font-size: 1.1rem; padding: 2px 8px; background: #f0f0f0; border-radius: 4px;">${item.cantidad}</span>
                    </div>

                    <div style="text-align: right; min-width: 100px;">
                        <p style="font-weight: bold; color: #007bff; font-size: 1.1rem;">$${subtotal}</p>
                    </div>

                    <button class="btn-eliminar" data-codigo="${item.codigo}" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
        });

        contenedor.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${itemsHTML}
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <button id="btn-vaciar" style="background: #6c757d; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                    Vaciar Carrito
                </button>
                
                <div style="text-align: right;">
                    <h3 style="font-size: 1.5rem; margin-bottom: 10px;">Total: <span style="color: #28a745;">$${total}</span></h3>
                    <button id="btn-pagar" style="background: #28a745; color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1.1rem;">
                        Proceder al Pago 💳
                    </button>
                </div>
            </div>
        `;

        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const codigo = e.target.getAttribute('data-codigo');
                const nuevoCarrito = obtenerCarrito().filter(p => p.codigo !== codigo);
                guardarCarrito(nuevoCarrito);
            });
        });

        document.getElementById('btn-vaciar').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                guardarCarrito([]);
            }
        });

        document.getElementById('btn-pagar').addEventListener('click', () => {
            alert('¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.');
            guardarCarrito([]);
        });
    }

    renderizarCarrito();
});