export const Blog = () => {
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

    return (
        <main className="container my-5" style={{ maxWidth: '1000px' }}>
            <h1 className="text-center text-dark mb-2">Blog Veterinario</h1>
            <p className="text-center text-muted mb-5">
                Consejos, noticias y cuidados para mantener a tu mascota feliz y saludable.
            </p>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {articulos.map((articulo) => (
                    <div key={articulo.id} className="col">
                        <div className="card h-100 shadow-sm border-0">
                            <img 
                                src={articulo.imagen} 
                                className="card-img-top" 
                                alt={articulo.titulo} 
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <p className="text-primary fw-bold small mb-2">
                                    🗓️ {articulo.fecha}
                                </p>
                                <h5 className="card-title text-dark mb-3" style={{ lineHeight: '1.4' }}>
                                    {articulo.titulo}
                                </h5>
                                <p className="card-text text-muted mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                                    {articulo.resumen}
                                </p>
                                <button className="btn btn-outline-success fw-bold w-100 mt-auto">
                                    Leer más
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};