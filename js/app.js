// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-destacados');

    
    if (contenedor) {
        const productosDestacados = [
            ...db_servicios.slice(0, 3), 
            ...db_medicamentos.slice(0, 3)
        ];

        productosDestacados.forEach(item => {
            const tarjeta = document.createElement('article');
            
            tarjeta.style.border = "1px solid #ddd";
            tarjeta.style.borderRadius = "8px";
            tarjeta.style.padding = "15px";
            tarjeta.style.width = "250px";
            tarjeta.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

            const detalle = item.especie ? `Especie: ${item.especie}` : `Stock: ${item.stock}`;

            tarjeta.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" style="width: 100%; border-radius: 5px;">
                <p style="font-size: 0.8rem; color: #666; margin-top: 10px;">${item.categoria}</p>
                <h3 style="font-size: 1.1rem; margin: 10px 0;">${item.nombre}</h3>
                <p style="font-size: 0.9rem; color: #444;">${detalle}</p>
                <p style="font-size: 1.2rem; color: #28a745; font-weight: bold; margin: 10px 0;">
                    $${item.precio.toLocaleString('es-CL')}
                </p>
                <button style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Ver detalle
                </button>
            `;

            contenedor.appendChild(tarjeta);
        });
    }
});