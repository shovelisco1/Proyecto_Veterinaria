import { useState } from 'react';

export const Registro = ({ setVistaActual }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensajeError('');

        if (password !== confirmarPassword) {
            setMensajeError('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuariosVetSanMarcos')) || [];
        const usuarioExiste = usuarios.find(u => u.email === email);

        if (usuarioExiste) {
            setMensajeError('Este correo ya está registrado.');
            return;
        }

        const nuevoUsuario = { nombre, email, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuariosVetSanMarcos', JSON.stringify(usuarios));

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setVistaActual('login');
    };

    return (
        <main className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <h2 className="text-center mb-4">Crear Cuenta</h2>
                
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label htmlFor="nombre" className="form-label fw-bold text-secondary">
                            Nombre completo:
                        </label>
                        <input 
                            type="text" 
                            id="nombre" 
                            required 
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label fw-bold text-secondary">
                            Correo electrónico:
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="form-label fw-bold text-secondary">
                            Contraseña:
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmar-password" className="form-label fw-bold text-secondary">
                            Confirmar Contraseña:
                        </label>
                        <input 
                            type="password" 
                            id="confirmar-password" 
                            required 
                            className="form-control"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                        />
                    </div>

                    {mensajeError && (
                        <p className="text-danger fw-bold m-0 small">{mensajeError}</p>
                    )}

                    <button type="submit" className="btn btn-primary fw-bold mt-2 py-2 fs-5">
                        Registrarse
                    </button>
                </form>
                
                <p className="text-center mt-4 text-muted mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <button 
                        onClick={() => setVistaActual('login')} 
                        className="btn btn-link p-0 fw-bold text-decoration-none"
                    >
                        Ingresa aquí
                    </button>
                </p>
            </div>
        </main>
    );
};