document.addEventListener('DOMContentLoaded', () => {
    const contenedorBlog = document.getElementById('contenedor-blog');

    const articulos = [
        {
            id: 1,
            titulo: "Cuidados básicos para cachorros en sus primeros meses",
            fecha: "12 Octubre, 2026",
            resumen: "Aprende todo lo necesario sobre vacunación, desparasitación y alimentación para que tu nuevo mejor amigo crezca sano y fuerte.",
            imagen: "https://placehold.co/400x250?text=Cachorros"
        },
        {
            id: 2,
            titulo: "¿Por qué mi gato no usa el arenero?",
            fecha: "05 Octubre, 2026",
            resumen: "Descubre las razones médicas y conductuales más comunes por las que los felinos dejan de usar su caja de arena y cómo solucionarlo.",
            imagen: "https://placehold.co/400x250?text=Gatos+y+Areneros"
        },
        {
            id: 3,
            titulo: "La importancia de la limpieza dental en mascotas",
            fecha: "28 Septiembre, 2026",
            resumen: "El sarro y la gingivitis pueden causar problemas graves de salud en perros y gatos. Conoce cómo prevenir el mal aliento y la pérdida dental.",
            imagen: "https://placehold.co/400x250?text=Salud+Dental"
        }
    ];

    function renderizarArticulos() {
        contenedorBlog.innerHTML = '';

        articulos.forEach(articulo => {
            const tarjeta = document.createElement('div');
            tarjeta.style.cssText = "background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;";
            
            tarjeta.innerHTML = `
                <img src="${articulo.imagen}" alt="${articulo.titulo}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
                    <p style="color: #007bff; font-size: 0.9rem; font-weight: bold; margin-bottom: 10px;">🗓️ ${articulo.fecha}</p>
                    <h3 style="font-size: 1.2rem; color: #333; margin-bottom: 15px; line-height: 1.4;">${articulo.titulo}</h3>
                    <p style="color: #666; font-size: 1rem; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${articulo.resumen}</p>
                    <button style="background-color: transparent; color: #28a745; border: 2px solid #28a745; padding: 10px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: 0.3s; width: 100%;">
                        Leer más
                    </button>
                </div>
            `;
            
            
            const btn = tarjeta.querySelector('button');
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#28a745';
                btn.style.color = 'white';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#28a745';
            });

            contenedorBlog.appendChild(tarjeta);
        });
    }

    renderizarArticulos();
});