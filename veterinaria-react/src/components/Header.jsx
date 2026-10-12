export const Header = () => {
    return (
        <header className="d-flex justify-content-between align-items-center bg-white p-3 shadow-sm">
            <div className="logo">
                <h2 className="text-primary m-0">🐾 Vet San Marcos</h2>
            </div>
            
            <nav className="d-none d-md-flex gap-3">
                <a href="/" className="text-decoration-none text-secondary fw-bold">Inicio</a>
                <a href="/catalogo" className="text-decoration-none text-secondary fw-bold">Catálogo</a>
                <a href="/nosotros" className="text-decoration-none text-secondary fw-bold">Nosotros</a>
                <a href="/contacto" className="text-decoration-none text-secondary fw-bold">Contacto</a>
            </nav>

            <div className="opciones-usuario d-flex gap-2">
                <a href="/carrito" className="btn btn-outline-success fw-bold">🛒 Carrito (0)</a>
                <a href="/login" className="btn btn-primary fw-bold">Ingresar</a>
            </div>
        </header>
    );
};