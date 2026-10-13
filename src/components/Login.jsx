import { useState } from 'react';

export const Login = ({ setVistaActual }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensajeError('');

        const emailTrimmed = email.trim();
        const passwordTrimmed = password.trim();

        
        if (emailTrimmed === '' || passwordTrimmed === '') {
            setMensajeError('Por favor, completa todos los campos.');
            return;
        }

        
        if (!emailTrimmed.includes('@') || !emailTrimmed.includes('.')) {
            setMensajeError('El formato del correo electrónico no es válido.');
            return;
        }

        
        if (passwordTrimmed.length < 6) {
            setMensajeError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        rage
        const usuarios = JSON.parse(localStorage.getItem('usuariosVetSanMarcos')) || [];
        const usuarioValido = usuarios.find(u => u.email === emailTrimmed && u.password === passwordTrimmed);

        if (usuarios.length > 0 && !usuarioValido) {
            setMensajeError('Correo o contraseña incorrectos.');
            return;
        }

        alert('¡Inicio de sesión exitoso!');
        setVistaActual('inicio');
    };

    return (
        <main className="container mt-5" style={{ maxWidth: '450px' }}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label htmlFor="email" className="form-label fw-bold text-secondary">
                            Correo Electrónico
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="form-label fw-bold text-secondary">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {mensajeError && (
                        <p className="text-danger fw-bold m-0 small">{mensajeError}</p>
                    )}
                    
                    <button type="submit" className="btn btn-primary fw-bold mt-2 py-2 fs-5">
                        Ingresar
                    </button>
                </form>

                <p className="text-center mt-4 text-muted mb-0">
                    ¿No tienes cuenta?{' '}
                    <button 
                        onClick={() => setVistaActual('registro')} 
                        className="btn btn-link p-0 fw-bold text-decoration-none"
                    >
                        Regístrate aquí
                    </button>
                </p>
            </div>
        </main>
    );
};