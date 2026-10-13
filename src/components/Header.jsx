export const Header = ({ setVistaActual }) => {
    return (
        <header className="d-flex justify-content-between align-items-center bg-white p-3 shadow-sm">
            <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setVistaActual('inicio')}>
                <h2 className="text-primary m-0">🐾 Vet San Marcos</h2>
            </div>
            
            <nav className="d-none d-md-flex gap-3">
                <a href="#" onClick={(e) => { e.preventDefault(); setVistaActual('inicio'); }} className="text-decoration-none text-secondary fw-bold">Inicio</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setVistaActual('catalogo'); }} className="text-decoration-none text-secondary fw-bold">Catálogo</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setVistaActual('blog'); }} className="text-decoration-none text-secondary fw-bold">Blog</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setVistaActual('contacto'); }} className="text-decoration-none text-secondary fw-bold">Contacto</a>
            </nav>

            <div className="opciones-usuario d-flex gap-2">
                <a href="#" onClick={(e) => { e.preventDefault(); setVistaActual('carrito'); }} className="btn btn-outline-success fw-bold">
                    🛒 Carrito
                </a>
                <button onClick={() => setVistaActual('login')} className="btn btn-primary fw-bold">
                    Ingresar
                </button>
            </div>
        </header>
    );
};